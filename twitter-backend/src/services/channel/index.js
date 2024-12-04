const { catchAndTransformMongooseError } = require("../../server/handlers");

class ChannelService {
    constructor({logger, channelRepository}) {
        this.logger = logger;
        this.channelRepository = channelRepository;
    }

    async createChannel({name, isGroupChat, userIds}) {
        return await catchAndTransformMongooseError(
            this.channelRepository.create({name, isGroupChat, userIds}),
            this.logger,
            "channel"
        );
    }
}

module.exports = ChannelService