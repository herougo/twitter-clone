const { catchAndTransformMongooseError } = require("../../server/handlers");
const { catchAndTransformPostEngagementError } = require("../../server/handlers/inner");
const { NOTIFICATION_TYPES } = require("../../utils/enums");
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
        return { id: post._id };
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
        return
        await this.notificationService.createNotification({
            userToId: post.author,
            userFromId,
            type: NOTIFICATION_TYPES.like
        });
    }

    async dislike(userFromId, postId) {
        await this._verifyEngagementArgs(userFromId, postId);
        const post = await this._getPost(postId);

        await catchAndTransformPostEngagementError(
            this.postRepository.addDislike(post, userFromId)
        );
        return
        await this.notificationService.createNotification({
            userToId: post.author,
            userFromId,
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
}

module.exports = PostService