const DI_NAMES = require("../../../../src/server/dependency-injection/names");
const { DB_IDS } = require("../ids");

const populateUsers = async (diContainer) => {
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
    const anotherUser = await userRepository.create(
        {
            _id: DB_IDS.anotherUser,
            username: "another",
            passwordHash: "$2b$10$AbJt1PaeMfPOOuI7lmgiYOMYv2vL/WGtGV1TuMAjjSo0jAZt1hQ2.",
            firstName: "hiya",
            lastName: "me",
            email: "another@example.com"
        }
    );
}

module.exports = {
    populateUsers
};

