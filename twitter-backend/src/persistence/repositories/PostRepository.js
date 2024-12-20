const { POST_ENGAGEMENT_TYPES } = require("../../utils/enums");
const { ExistingPostEngagementError, MissingPostEngagementError } = require("../../utils/errors/internalErrors");
const Post = require("../models/Post");


class  PostRepository {
    async findById(id) {
        return await Post.findById(id);
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
}

module.exports = PostRepository;