const Notification = require("../models/Notification");

class  NotificationRepository {
    async findOneById(id) {
        return await Notification.findOneById(id);
    }

    async create({userToId, userFromId, type}) {
        return await Notification.create(
            {
                userTo: userToId,
                userFrom: userFromId,
                type
            }
        );
    }

    async deleteAll() {
        return await Notification.deleteMany({});
    }

    async markAsRead(notification) {
        notification.read = true;
        await notification.save();
    }
}

module.exports = NotificationRepository;