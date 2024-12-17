const { catchAndTransformMongooseError } = require("../../server/handlers");
const { BadRequestError } = require("../../utils/errors/expressErrors");

class ChannelService {
    constructor({logger, channelRepository}) {
        this.logger = logger;
        this.channelRepository = channelRepository;
    }
    
    async _createChannel(createData) {
        return await catchAndTransformMongooseError(
            this.channelRepository.create(createData),
            this.logger,
            "channel"
        );
    }

    async createChannel({_id, userIds}) {
        return await this._createChannel({_id, userIds: [...userIds].sort()});
    }

    async openDirectMessageChannel({userIds}) {
        // returns channel, creates if doesn't exist
        if (userIds.length !== 2) {
            throw new BadRequestError(`Cannot open a DM channel with ${userIds.length} users (must use 2)!`);
        }

        const sortedUserIds = [...userIds].sort();

        const existingChannel = await catchAndTransformMongooseError(
            this.channelRepository.findOneByUserIds({userIds: sortedUserIds}),
            this.logger,
            "channel"
        );
        if (existingChannel) {
            return existingChannel;
        }

        const newChannel = await this._createChannel({userIds: sortedUserIds});

        return { id: newChannel._id };
    }
}

module.exports = ChannelService