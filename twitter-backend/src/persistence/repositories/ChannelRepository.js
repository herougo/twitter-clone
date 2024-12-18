const Channel = require("../models/Channel");

class ChannelRepository {
    async findById(id) {
        return await Channel.findById(id);
    }

    async findOneByUserIds(userIds) {
        return await Channel.findOne({users: userIds});
    }

    async findByOneUserId(userId) {
        return await Channel.find({ users: userId }).sort({ lastMessageSentAt: -1 });
    }

    async create({ _id, userIds }) {
        const createData = {
            users: userIds
        }
        if (_id) {
            createData._id = _id;
        }

        return await Channel.create(createData);
    }

    async deleteAll() {
        return await Channel.deleteMany({});
    }

    async addLastMessage(channel, message) {
        channel.lastMessage = message._id;
        channel.lastMessageSentAt = message.createdAt;
        await channel.save();
    }
}

module.exports = ChannelRepository;