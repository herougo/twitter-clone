const DI_NAMES = require("../../../../src/server/dependency-injection/names");
const { DB_IDS } = require("../ids");

const populateMessages = async (diContainer) => {
    const messageRepository = diContainer.resolve(DI_NAMES.messageRepository);
    const channelRepository = diContainer.resolve(DI_NAMES.channelRepository);

    const mainChannel = await channelRepository.findById(DB_IDS.mainChannel);
    const mainMessage = await messageRepository.fullCreate({
        _id: DB_IDS.mainMessage,
        content: 'Hello friend!',
        authorId: DB_IDS.followerUser,
        channel: mainChannel
    });
};

module.exports = {
    populateMessages
};
