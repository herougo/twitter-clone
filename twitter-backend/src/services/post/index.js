const { catchAndTransformMongooseError } = require("../../server/handlers");
const { catchAndTransformPostEngagementError } = require("../../server/handlers/inner");
const { NOTIFICATION_TYPES } = require("../../utils/enums");
const { BadRequestError } = require("../../utils/errors/expressErrors");

class PostService {
    constructor({logger, notificationService, postRepository}) {
        this.logger = logger;
        this.notificationService = notificationService;
        this.postRepository = postRepository;
    }

    async createPost({authorId, content, replyToId}) {
        let replyTo = null;
        if (replyTo) {
            replyTo = await catchAndTransformMongooseError(
                postRepository.findById(replyToId),
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
    }

    async _getPost(postId) {
        const post = await catchAndTransformMongooseError(
            postRepository.findById(postId),
            this.logger,
            "post"
        );

        if (!post) {
            throw new BadRequestError("invalid postId");
        }

        return post;
    }

    async like(userFromId, postId) {
        const post = await this._getPost(postId);

        catchAndTransformPostEngagementError(
            this.postRepository.addLike(post, userFromId)
        );

        await this.notificationService.createNotification({
            userToId: post.author,
            userFromId,
            type: NOTIFICATION_TYPES.like
        });
    }

    async dislike(userFromId, postId) {
        const post = await this._getPost(postId);

        catchAndTransformPostEngagementError(
            this.postRepository.addDislike(post, userFromId)
        );

        await this.notificationService.createNotification({
            userToId: post.author,
            userFromId,
            type: NOTIFICATION_TYPES.dislike
        });
    }

    async unlike(userFromId, postId) {
        const post = await this._getPost(postId);

        catchAndTransformPostEngagementError(
            this.postRepository.removeLike(post, userFromId)
        );
        
    }

    async undislike(userFromId, postId) {
        const post = await this._getPost(postId);

        catchAndTransformPostEngagementError(
            this.postRepository.removeDislike(post, userFromId)
        );
    }
}

module.exports = PostService