const mongoose = require("mongoose");
const CONFIG = require("../../../src/config");
const DI_NAMES = require("../../../src/server/dependency-injection/names");
const { ENVIRONMENTS } = require("../../../src/utils/enums");
const { UnexpectedDatabaseChangeError } = require("../../../src/utils/errors/internalErrors");
const { populateUsers } = require("./populate/users");

const populateDatabase = async (diContainer) => {
    // In case CONFIG.nodeEnv is not properly set when running tests
    if (CONFIG.nodeEnv !== ENVIRONMENTS.test) {
        throw new UnexpectedDatabaseChangeError();
    }

    await populateUsers(diContainer);
}

const clearDatabase = async (diContainer) => {
    if (CONFIG.nodeEnv !== ENVIRONMENTS.test) {
        throw new UnexpectedDatabaseChangeError();
    }

    const userRepository = diContainer.resolve(DI_NAMES.userRepository)

    const repositories = [userRepository];
    for (const repository of repositories) {
        await repository.deleteAll();
    }
}

module.exports = {
    populateDatabase,
    clearDatabase
};