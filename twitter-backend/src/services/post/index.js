const { catchAndTransformMongooseError } = require("../../server/handlers");
const { catchAndTransformPostEngagementError } = require("../../server/handlers/inner");
const { NOTIFICATION_TYPES, POST_ENGAGEMENT_TYPES } = require("../../utils/enums");
const { BadRequestError } = require("../../utils/errors/expressErrors");

class PostService {
    constructor({logger, notificationService, postRepository, userRepository}) {
        this.logger = logger;
        this.notificationService = notificationService;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    async createPost({authorId, content, replyToId}) {
        if (!authorId) {
            throw new BadRequestError("Missing authorId");
        }
        if (!content) {
            throw new BadRequestError("Missing content");
        }
        const author = await this.userRepository.findById(authorId);
        if (!author) {
            throw new BadRequestError("Invalid author");
        }

        let replyTo = null;
        if (replyToId) {
            replyTo = await catchAndTransformMongooseError(
                this.postRepository.findById(replyToId),
                this.logger,
                "post"
            );

            if (!replyTo) {
                throw new BadRequestError("Invalid parent post");
            }
        }

        const post = await catchAndTransformMongooseError(
            this.postRepository.fullCreate({authorId, content, replyTo}),
            this.logger,
            "post"
        );
        return this.transformPost(post, author, author.id);
    }

    async _getPost(postId) {
        const post = await catchAndTransformMongooseError(
            this.postRepository.findById(postId),
            this.logger,
            "post"
        );

        if (!post) {
            throw new BadRequestError("invalid postId");
        }

        return post;
    }

    async _verifyEngagementArgs(userFromId, postId) {
        if (!userFromId) {
            throw new BadRequestError("Missing userFromId");
        }
        if (!postId) {
            throw new BadRequestError("Missing postId");
        }

        const user = await this.userRepository.findById(userFromId);
        if (!user) {
            throw new BadRequestError("Invalid userFromId");
        }
    }

    async like(userFromId, postId) {
        await this._verifyEngagementArgs(userFromId, postId);
        const post = await this._getPost(postId);

        await catchAndTransformPostEngagementError(
            this.postRepository.addLike(post, userFromId)
        );
        
        await this.notificationService.createNotification({
            userToId: post.author,
            userFromId,
            postId: post._id,
            type: NOTIFICATION_TYPES.like
        });
    }

    async dislike(userFromId, postId) {
        await this._verifyEngagementArgs(userFromId, postId);
        const post = await this._getPost(postId);

        await catchAndTransformPostEngagementError(
            this.postRepository.addDislike(post, userFromId)
        );

        await this.notificationService.createNotification({
            userToId: post.author,
            userFromId,
            postId: post._id,
            type: NOTIFICATION_TYPES.dislike
        });
    }

    async unlike(userFromId, postId) {
        await this._verifyEngagementArgs(userFromId, postId);
        const post = await this._getPost(postId);

        await catchAndTransformPostEngagementError(
            this.postRepository.removeLike(post, userFromId)
        );
        
    }

    async undislike(userFromId, postId) {
        await this._verifyEngagementArgs(userFromId, postId);
        const post = await this._getPost(postId);

        await catchAndTransformPostEngagementError(
            this.postRepository.removeDislike(post, userFromId)
        );
    }

    transformAuthor(author) {
        return {
            name: `${author.firstName} ${author.lastName}`,
            username: author.username
        }
    }

    transformPost(post, author, loggedInUserId) {
        // TODO: performance improvement of userInteraction
        let userInteraction = '';
        if (post.likes.includes(loggedInUserId)) {
            userInteraction = POST_ENGAGEMENT_TYPES.like;
        } else if (post.dislikes.includes(loggedInUserId)) {
            userInteraction = POST_ENGAGEMENT_TYPES.dislike;
        }

        let result = {
            id: post.id,
            author: this.transformAuthor(author),
            content: post.content,
            numLikes: post.likes?.length || 0,
            numDislikes: post.dislikes?.length || 0,
            createdDate: post.createdAt,
            userInteraction: userInteraction,
        };
        if (post.replyTo?.content) { // if replyTo populated
            result.replyTo = {
                id: post.replyTo.id,
                author: this.transformAuthor(post.replyTo.author),
                content: post.replyTo.content,
                createdDate: post.replyTo.createdAt
            }
        }
        return result;
    }

    async getPosts(username, loggedInUserId) {
        if (!username) {
            throw new BadRequestError("GetPosts: Missing user");
        }

        if (!loggedInUserId) {
            throw new BadRequestError("GetPosts: Missing loggedInUserId");
        }

        const user = await catchAndTransformMongooseError(
            this.userRepository.findOneByUsername(username),
            this.logger,
            "user"
        );
        if (!user) {
            throw new BadRequestError("GetPosts: Invalid user");
        }

        const posts = await catchAndTransformMongooseError(
            this.postRepository.findByUserIdAndPopulateReplyTo(user.id),
            this.logger,
            "post"
        );

        return posts.map(post => this.transformPost(post, user, loggedInUserId));
    }

    async getPost(postId, loggedInUserId) {
        if (!postId) {
            throw new BadRequestError("GetPost: Missing postId");
        }

        if (!loggedInUserId) {
            throw new BadRequestError("GetPost: Missing loggedInUserId");
        }

        const post = await catchAndTransformMongooseError(
            this.postRepository.findAndPopulateAuthorsAndReplies(postId),
            this.logger,
            "post"
        );

        if (!post) {
            throw new BadRequestError("GetPost: Invalid postId");
        }

        return {
            post: this.transformPost(post, post.author, loggedInUserId),
            replies: post.replies.map(reply => 
                this.transformPost(reply, reply.author, loggedInUserId)
            )
        };
    }
}

module.exports = PostService