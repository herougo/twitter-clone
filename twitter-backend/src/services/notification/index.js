const { catchAndTransformMongooseError } = require("../../server/handlers");

class NotificationService {
    constructor({logger, notificationRepository}) {
        this.logger = logger;
        this.notificationRepository = notificationRepository;
    }

    async createNotification({userToId, userFromId, type}) {
        const notification = await catchAndTransformMongooseError(
            this.notificationRepository.fullCreate({userToId, userFromId, type}),
            this.logger,
            "notification"
        );
        return notification
    }
}

module.exports = NotificationService