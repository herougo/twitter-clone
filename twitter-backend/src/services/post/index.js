const { catchAndTransformMongooseError } = require("../../server/handlers");
const { NOTIFICATION_TYPES } = require("../../utils/enums");
const { BadRequestError } = require("../../utils/errors/expressErrors");

class PostService {
    constructor({logger, postRepository, notificationService}) {
        this.logger = logger;
        this.postRepository = postRepository, notificationService;
    }

    async createPost({authorId, content, replyToId}) {
        let replyTo = null;
        if (replyTo) {
            replyTo = await catchAndTransformMongooseError(
                postRepository.findOneById(replyToId),
                this.logger,
                "post"
            );

            if (!replyTo) {
                throw BadRequestError("Invalid parent post");
            }
        }

        const post = await catchAndTransformMongooseError(
            this.postRepository.fullCreate({authorId, content, replyTo}),
            this.logger,
            "post"
        );
    }

    async _performAction(userFromId, postId, type) {
        const post = await catchAndTransformMongooseError(
            postRepository.findOneById(postId),
            this.logger,
            "post"
        );

        if (!post) {
            throw BadRequestError("invalid postId");
        }

        await this.notificationService.createNotification({
            userToId: post.author,
            userFromId,
            type
        });
    }

    async like(userFromId, postId) {
        await this._performAction(userFromId, postId, NOTIFICATION_TYPES.like);
    }

    async dislike(userFromId, postId) {
        await this._performAction(userFromId, postId, NOTIFICATION_TYPES.dislike);
    }
}

module.exports = PostService