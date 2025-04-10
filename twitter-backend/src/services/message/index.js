const { catchAndTransformMongooseError } = require("../../server/handlers");
const { BadRequestError } = require("../../utils/errors/expressErrors");

class MessageService {
    constructor({logger, channelRepository, messageRepository}) {
        this.logger = logger;
        this.channelRepository = channelRepository;
        this.messageRepository = messageRepository;
    }

    async sendMessage({content, authorId, channelId}) {
        if (!content) {
            throw new BadRequestError('Missing content');
        }
        if (!authorId) {
            throw new BadRequestError('Missing authorId');
        }
        if (!channelId) {
            throw new BadRequestError('Missing channelId');
        }

        const channel = await catchAndTransformMongooseError(
            this.channelRepository.findById(channelId),
            this.logger,
            "channel"
        );

        if (!channel) {
            throw new BadRequestError("Invalid channelId");
        }

        if (!channel.users.includes(authorId)) {
            throw new BadRequestError("Author not in channel");
        }

        const message = await catchAndTransformMongooseError(
            this.messageRepository.fullCreate({content, authorId, channel}),
            this.logger,
            "message"
        );
        return { id: message._id, createdAt: message.createdAt };
    }

    _messagesToObjectArray(messages) {
        const result = [];
        for (const message of messages) {
            result.push({
                id: message._id,
                content: message.content,
                authorId: message.author,
                createdAt: message.createdAt
            })
        }
        return result;
    }

    async fullFeed(channelId, loggedInUserId) {
        if (!channelId) {
            throw new BadRequestError('Missing channelId');
        }

        const channel = await catchAndTransformMongooseError(
            this.channelRepository.findById(channelId),
            this.logger,
            "channel"
        );

        const userIndex = channel.users.indexOf(loggedInUserId);
        if (userIndex === -1) {
            throw new BadRequestError('User not in channel');
        }
        const otherUserId = channel.users[1 - userIndex];

        const messages = await catchAndTransformMongooseError(
            this.messageRepository.findByChannelId(channelId),
            this.logger,
            "message"
        );

        return {
            messages: this._messagesToObjectArray(messages),
            otherUserId 
        };
    }
}

module.exports = MessageService