const UserRepository = require("../../persistence/repositories/UserRepository");
const UserService = require("../../services/user");
const Logger = require("../../utils/logger");
const DependencyInjectionContainer = require("./container");
const DI_NAMES = require("./names");


const buildDIContainer = (customDependenciesMap) => {
    const container = new DependencyInjectionContainer(customDependenciesMap);

    const logger = container.register(DI_NAMES.logger, new Logger());
    const userRepository = container.register(DI_NAMES.userRepository, new UserRepository());
    const userService = container.register(DI_NAMES.userService, new UserService(
        {logger, userRepository}
    ));
    const channelRepository = container.register(DI_NAMES.channelRepository, new ChannelRepository());
    const messageRepository = container.register(
        DI_NAMES.channelRepository,
        new MessageRepository(channelRepository)
    );
    const notificationRepository = container.register(DI_NAMES.notificationRepository, new NotificationRepository());
    const postRepository = container.register(DI_NAMES.postRepository, new PostRepository());

    return container;
}

module.exports = buildDIContainer;