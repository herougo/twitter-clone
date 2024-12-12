const { catchAndTransformMongooseError } = require("../../server/handlers");
const { BadRequestError } = require("../../utils/errors/expressErrors");

class NotificationService {
    constructor({logger, notificationRepository}) {
        this.logger = logger;
        this.notificationRepository = notificationRepository;
    }

    async createNotification({userToId, userFromId, type}) {
        const notification = await catchAndTransformMongooseError(
            this.notificationRepository.create({userToId, userFromId, type}),
            this.logger,
            "notification"
        );
        return notification
    }

    async markAsRead(notificationId) {
        const notification = await this.notificationRepository.findById(notificationId);
        if (!notification) {
            throw new BadRequestError("Invalid notification");
        }
        await this.notificationRepository.markAsRead(notification);
    }
}

module.exports = NotificationService