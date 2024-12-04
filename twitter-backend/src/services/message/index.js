const { catchAndTransformMongooseError } = require("../../server/handlers");
const { BadRequestError } = require("../../utils/errors/expressErrors");

class MessageService {
    constructor({logger, channelRepository, messageRepository}) {
        this.logger = logger;
        this.channelRepository = channelRepository;
        this.messageRepository = messageRepository;
    }

    async sendMessage({content, authorId, channelId}) {
        const channel = await catchAndTransformMongooseError(
            this.channelRepository.findOneById(channelId),
            this.logger,
            "channel"
        );

        if (!channel) {
            throw BadRequestError("Invalid channelId");
        }

        const message = await catchAndTransformMongooseError(
            this.messageRepository.fullCreate({content, authorId, channel}),
            this.logger,
            "message"
        );
        return message;
    }
}

module.exports = MessageService