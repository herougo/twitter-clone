const { catchAndTransformMongooseError } = require("../../server/handlers");
const { BadRequestError } = require("../../utils/errors/expressErrors");

class ChannelService {
    constructor({logger, channelRepository, userRepository}) {
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
        if(!userIds) {
            throw new BadRequestError('Missing userIds');
        }

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

    _channelsToObjectArray(userId, channels) {
        const result = [];
        for (const channel of channels) {
            const otherUserId = channel.users[1 - channel.users.indexOf(userId)];
            result.push({
                id: channel._id,
                userId: otherUserId,
                lastMessageContent: channel.lastMessageContent,
                lastMessageSentAt: channel.lastMessageSentAt
            });
        }
        return result;
    }

    _usersToObjectArray(users) {
        const result = [];
        for (const user of users) {
            result.push({
                id: user._id,
                username: user.username,
                name: `${user.firstName} ${user.lastName}`
            });
        }
        return result;
    }

    async fullFeed(userId) {
        if (!userId) {
            throw new BadRequestError('Missing userId');
        }

        const channels = await catchAndTransformMongooseError(
            this.channelRepository.findByOneUserId(userId),
            this.logger,
            "channel"
        );

        return this._channelsToObjectArray(userId, channels);
    }
}

module.exports = ChannelService