const Message = require("../models/Message");

class MessageRepository {
    constructor (channelRepository) {
        this.channelRepository = channelRepository;
    }

    async findById(id) {
        return await Message.findById(id);
    }

    async _create({content, authorId, channel}) {
        return await Message.create({
            content,
            author: authorId,
            channel: channel._id
        });
    }

    async deleteAll() {
        return await Message.deleteMany({});
    }

    async fullCreate({content, authorId, channel}) {
        const message = await this._create({content, authorId, channel});
        this.channelRepository.addLastMessage(channel, message);
    }
}

module.exports = MessageRepository;