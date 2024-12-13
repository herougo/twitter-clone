const { catchAndTransformMongooseError } = require("../../server/handlers");
const { NOTIFICATION_TYPES, POST_ENGAGEMENT_TYPES } = require("../../utils/enums");
const { BadRequestError } = require("../../utils/errors/expressErrors");

class NotificationService {
    constructor({logger, notificationRepository}) {
        this.logger = logger;
        this.notificationRepository = notificationRepository;
    }

    async createNotification({userToId, userFromId, postId, type}) {
        if (!userToId) {
            throw new BadRequestError("Missing userToId");
        }
        if (!userFromId) {
            throw new BadRequestError("Missing userFromId");
        }
        if (!type) {
            throw new BadRequestError("Missing type");
        }
        if ((type in POST_ENGAGEMENT_TYPES) && !postId) {
            throw new BadRequestError("Post Engagement Notifications Must Reference a Post");
        }

        const notification = await catchAndTransformMongooseError(
            this.notificationRepository.create({userToId, userFromId, postId, type}),
            this.logger,
            "notification"
        );
        return notification
    }

    async markAsRead(notificationId) {
        if (!notificationId) {
            throw new BadRequestError("Missing notificationId");
        }

        const notification = await this.notificationRepository.findById(notificationId);
        if (!notification) {
            throw new BadRequestError("Invalid notificationId");
        }
        await this.notificationRepository.markAsRead(notification);
    }
}

module.exports = NotificationService