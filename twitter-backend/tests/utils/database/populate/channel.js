const DI_NAMES = require("../../../../src/server/dependency-injection/names");
const { DB_IDS } = require("../ids");

const populateChannels = async (diContainer) => {
    const channelRepository = diContainer.resolve(DI_NAMES.channelRepository);
    const mainChannel = await channelRepository.create({
        _id: DB_IDS.mainChannel,
        userIds: [DB_IDS.mainUser, DB_IDS.followerUser].sort()
    });
};

module.exports = {
    populateChannels
};
