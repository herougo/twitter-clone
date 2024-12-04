const Channel = require("../models/Channel");

class ChannelRepository {
    async findOneById(id) {
        return await Channel.findOneById(id);
    }

    async create({name, isGroupChat, userIds}) {
        return await Channel.create({name, isGroupChat, users: userIds});
    }

    async deleteAll() {
        return await Channel.deleteMany({});
    }

    async addLastMessage(channel, message) {
        channel.lastMessage = message._id;
        await channel.save();
    }
}

module.exports = ChannelRepository;