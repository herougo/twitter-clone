const UserRepository = require("../../persistence/repositories/UserRepository");
const UserService = require("../../services/user");
const Logger = require("../../utils/logger");
const DependencyInjectionContainer = require("./container");
const DI_NAMES = require("./names");


const buildDIContainer = (mockedDependenciesMap) => {
    const container = new DependencyInjectionContainer(mockedDependenciesMap);

    const logger = container.register(DI_NAMES.logger, new Logger());
    const userRepository = container.register(DI_NAMES.userRepository, new UserRepository());
    const userService = container.register(DI_NAMES.userService, new UserService(
        {logger, userRepository}
    ));

    return container;
}

module.exports = buildDIContainer;