const DI_NAMES = require("../../../../src/server/dependency-injection/names");
const { USER_DATA } = require("../userData");

const populateUsers = async (diContainer) => {
    const userRepository = diContainer.resolve(DI_NAMES.userRepository)

    const user = await userRepository.create(
        USER_DATA.main
    );
    const follower = await userRepository.create(
        USER_DATA.follower
    );
    await userRepository.addFollower(user, follower);
    const anotherUser = await userRepository.create(
        USER_DATA.another
    );
}

module.exports = {
    populateUsers
};

