const Message = require("../models/Message");

class MessageRepository {
    constructor (channelRepository) {
        this.channelRepository = channelRepository;
    }

    async findById(id) {
        return await Message.findById(id);
    }

    async findByChannelId(channelId) {
        return await Message.find({channel: channelId}).sort({createdAt: 1});
    }

    async _create(data) {
        return await Message.create(data);
    }

    async deleteAll() {
        return await Message.deleteMany({});
    }

    async fullCreate({_id, content, authorId, channel}) {
        const createData = {
            content,
            author: authorId,
            channel: channel._id
        }
        if (_id) {
            createData._id = _id;
        }
        const message = await this._create(createData);
        await this.channelRepository.addLastMessage(channel, message);
        return message;
    }
}

module.exports = MessageRepository;