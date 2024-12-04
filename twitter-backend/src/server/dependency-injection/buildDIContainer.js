const ChannelRepository = require("../../persistence/repositories/ChannelRepository");
const NotificationRepository = require("../../persistence/repositories/NotificationRepository");
const MessageRepository = require("../../persistence/repositories/MessageRepository");
const PostRepository = require("../../persistence/repositories/PostRepository");
const UserRepository = require("../../persistence/repositories/UserRepository");
const ChannelService = require("../../services/channel");
const MessageService = require("../../services/message");
const NotificationService = require("../../services/notification");
const PostService = require("../../services/post");
const UserService = require("../../services/user");
const Logger = require("../../utils/logger");
const DependencyInjectionContainer = require("./container");
const DI_NAMES = require("./names");


const buildDIContainer = (customDependenciesMap) => {
    const container = new DependencyInjectionContainer(customDependenciesMap);

    const logger = container.register(DI_NAMES.logger, new Logger());

    const notificationRepository = container.register(DI_NAMES.notificationRepository, new NotificationRepository());
    const notificationService = container.register(DI_NAMES.notificationService, new NotificationService(
        {logger, notificationRepository}
    ));
    const userRepository = container.register(DI_NAMES.userRepository, new UserRepository());
    const userService = container.register(DI_NAMES.userService, new UserService(
        {logger, notificationService, userRepository}
    ));
    const channelRepository = container.register(DI_NAMES.channelRepository, new ChannelRepository());
    const channelService = container.register(DI_NAMES.channelService, new ChannelService(
        {logger, channelRepository}
    ));
    const messageRepository = container.register(
        DI_NAMES.messageRepository,
        new MessageRepository(channelRepository)
    );
    const messageService = container.register(DI_NAMES.messageService, new MessageService(
        {logger, channelRepository, messageRepository}
    ));
    const postRepository = container.register(DI_NAMES.postRepository, new PostRepository());
    const postService = container.register(DI_NAMES.postService, new PostService(
        {logger, notificationRepository, postRepository}
    ));

    return container;
}

module.exports = buildDIContainer;