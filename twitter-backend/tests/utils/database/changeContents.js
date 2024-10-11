const CONFIG = require("../../../src/config");
const DI_NAMES = require("../../../src/server/dependency-injection/names");
const { ENVIRONMENTS } = require("../../../src/utils/enums");

const populateDatabase = async (diContainer) => {
    // In case CONFIG.nodeEnv is not properly set when running tests
    if (CONFIG.nodeEnv !== ENVIRONMENTS.test) {
        throw new UnexpectedDatabaseChangeError();
    }

    const userRepository = diContainer.resolve(DI_NAMES.userRepository)

    await userRepository.create(
        {
            username: "username",
            passwordHash: "$2b$10$AbJt1PaeMfPOOuI7lmgiYOMYv2vL/WGtGV1TuMAjjSo0jAZt1hQ2.",
            firstName: "hi",
            lastName: "there",
            email: "example@example.com"
        }
    );
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