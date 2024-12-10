const Notification = require("../models/Notification");

class  NotificationRepository {
    async findById(id) {
        return await Notification.findById(id);
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