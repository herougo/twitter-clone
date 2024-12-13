const Notification = require("../models/Notification");

class  NotificationRepository {
    async findById(id) {
        return await Notification.findById(id);
    }

    async create({_id, userToId, userFromId, postId, type}) {
        const createData = {
            userTo: userToId,
            userFrom: userFromId,
            post: postId || null,
            type
        };
        if (_id) {
            createData._id = _id;
        }

        return await Notification.create(createData);
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