const mongoose = require("mongoose");
const CONFIG = require("../../../src/config");
const DI_NAMES = require("../../../src/server/dependency-injection/names");
const { ENVIRONMENTS } = require("../../../src/utils/enums");
const { UnexpectedDatabaseChangeError } = require("../../../src/utils/errors/internalErrors");
const { populateUsers } = require("./populate/users");
const { populatePosts } = require("./populate/posts");

const populateDatabase = async (diContainer) => {
    // In case CONFIG.nodeEnv is not properly set when running tests
    if (CONFIG.nodeEnv !== ENVIRONMENTS.test) {
        throw new UnexpectedDatabaseChangeError();
    }

    await populateUsers(diContainer);
    await populatePosts(diContainer);
}

const clearDatabase = async (diContainer) => {
    if (CONFIG.nodeEnv !== ENVIRONMENTS.test) {
        throw new UnexpectedDatabaseChangeError();
    }

    const userRepository = diContainer.resolve(DI_NAMES.userRepository);
    const postRepository = diContainer.resolve(DI_NAMES.postRepository);
    const notificationRepository = diContainer.resolve(DI_NAMES.notificationRepository);

    const repositories = [userRepository, postRepository, notificationRepository];
    for (const repository of repositories) {
        await repository.deleteAll();
    }
}

module.exports = {
    populateDatabase,
    clearDatabase
};