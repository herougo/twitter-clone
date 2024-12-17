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

    async createChannel({userIds}) {
        return await this._createChannel({userIds: [...userIds].sort()});
    }

    async openDirectMessageChannel({userIds}) {
        // returns channel, creates if doesn't exist
        if (userIds.length !== 2) {
            throw new BadRequestError(`Cannot open a DM channel with ${userIds.length} user(s) (must use 2)!`);
        }

        const sortedUserIds = [...userIds].sort();

        const existingChannel = await catchAndTransformMongooseError(
            this.channelRepository.findOneByUserIds(sortedUserIds),
            this.logger,
            "channel"
        );
        if (existingChannel) {
            return { id: existingChannel._id };
        }

        const newChannel = await this.createChannel({userIds: sortedUserIds});

        return { id: newChannel._id };
    }
}

module.exports = ChannelService