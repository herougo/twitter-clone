const mongoose = require("mongoose");
const CONFIG = require("../../../src/config");
const DI_NAMES = require("../../../src/server/dependency-injection/names");
const { ENVIRONMENTS } = require("../../../src/utils/enums");
const { UnexpectedDatabaseChangeError } = require("../../../src/utils/errors/internalErrors");
const { DB_IDS } = require("./ids");

const populateDatabase = async (diContainer) => {
    // In case CONFIG.nodeEnv is not properly set when running tests
    if (CONFIG.nodeEnv !== ENVIRONMENTS.test) {
        throw new UnexpectedDatabaseChangeError();
    }

    const userRepository = diContainer.resolve(DI_NAMES.userRepository)

    const user = await userRepository.create(
        {
            _id: DB_IDS.mainUser,
            username: "username",
            passwordHash: "$2b$10$AbJt1PaeMfPOOuI7lmgiYOMYv2vL/WGtGV1TuMAjjSo0jAZt1hQ2.",
            firstName: "hi",
            lastName: "there",
            email: "example@example.com"
        }
    );
    const follower = await userRepository.create(
        {
            _id: DB_IDS.followerUser,
            username: "follower",
            passwordHash: "$2b$10$AbJt1PaeMfPOOuI7lmgiYOMYv2vL/WGtGV1TuMAjjSo0jAZt1hQ2.",
            firstName: "hello",
            lastName: "you",
            email: "follower@example.com"
        }
    );
    await userRepository.addFollower(user, follower);
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