const { POST_ENGAGEMENT_TYPES } = require("../../utils/enums");
const { ExistingPostEngagementError, MissingPostEngagementError } = require("../../utils/errors/internalErrors");
const Post = require("../models/Post");


class  PostRepository {
    constructor({userRepository}) {
        this.userRepository = userRepository;
    }

    async findById(id) {
        return await Post.findById(id);
    }

    async findByUserId(authorId) {
        return await Post.find({author: authorId});
    }

    async findByUserIdAndPopulateReplyTo(authorId) {
        let result = await Post.find({author: authorId}).populate('replyTo').sort({createdAt: -1});
        result = await this.userRepository.populate(result, { path: 'replyTo.author' });
        return result;
    }

    async findAndPopulateAuthorsAndReplies(id) {
        let result = await Post.findById(id).populate('replyTo').populate({ path: 'replies', options: { sort: { 'createdAt': -1 } } });
        result = await this.userRepository.populate(result, { path: 'author' });
        result = await this.userRepository.populate(result, { path: 'replyTo.author' });
        result = await this.userRepository.populate(result, { path: 'replies.author' });
        return result;
    }

    async _create(createData) {
        return await Post.create(createData);
    }

    async deleteAll() {
        return await Post.deleteMany({});
    }

    async fullCreate({_id, authorId, content, replyTo}) {
        const createData = {
            author: authorId,
            content,
            replyTo: replyTo?._id
        }
        if (_id) {
            createData._id = _id
        }
        const newPost = await this._create(createData);
        if (replyTo) {
            replyTo.replies.push(newPost);
            await replyTo.save();
        }
        return newPost;
    }

    async addLike(post, userId) {
        if (post.likes.includes(userId)) {
            throw new ExistingPostEngagementError(POST_ENGAGEMENT_TYPES.like)
        }
        if (post.dislikes.includes(userId)) {
            post.dislikes.remove(userId);
        }
        post.likes.push(userId);
        await post.save();
    }

    async removeLike(post, userId) {
        if (!post.likes.includes(userId)) {
            throw new MissingPostEngagementError(POST_ENGAGEMENT_TYPES.like)
        }
        post.likes.remove(userId);
        await post.save();
    }
    
    async addDislike(post, userId) {
        if (post.dislikes.includes(userId)) {
            throw new ExistingPostEngagementError(POST_ENGAGEMENT_TYPES.dislike)
        }
        if (post.likes.includes(userId)) {
            post.likes.remove(userId);
        }
        post.dislikes.push(userId);
        await post.save();
    }

    async removeDislike(post, userId) {
        if (!post.dislikes.includes(userId)) {
            throw new MissingPostEngagementError(POST_ENGAGEMENT_TYPES.dislike)
        }
        post.dislikes.remove(userId);
        await post.save();
    }

    async getFullFeed(user) {
        const followingIds = user.following;

        const filter = { author: { $in: followingIds } };
        let result = await Post.find(filter).populate('replyTo').sort({createdAt: -1});
        result = await this.userRepository.populate(result, { path: 'author' });
        result = await this.userRepository.populate(result, { path: 'replyTo.author' });
        
        return result;
    }
}

module.exports = PostRepository;