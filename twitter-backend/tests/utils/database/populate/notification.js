const DI_NAMES = require("../../../../src/server/dependency-injection/names");
const { NOTIFICATION_TYPES } = require("../../../../src/utils/enums");
const { DB_IDS } = require("../ids");

const populateNotifications = async (diContainer) => {
    const notificationRepository = diContainer.resolve(DI_NAMES.notificationRepository);
    const mainNotification = await notificationRepository.create({
        _id: DB_IDS.mainNotification,
        userToId: DB_IDS.mainUser,
        userFromId: DB_IDS.followerUser,
        type: NOTIFICATION_TYPES.follow
    });
};

module.exports = {
    populateNotifications
};
