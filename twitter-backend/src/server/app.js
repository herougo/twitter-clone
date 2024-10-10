const express = require("express");
const applyRoutes = require("./routes");
const applyMiddleware = require("./middleware");
const initAllLoaders = require("../loaders");
const applyAllHandlers = require("./handlers");
const buildDIContainer = require("./dependency-injection/buildDIContainer");
const DI_NAMES = require("./dependency-injection/names");

const createApp = async (customDependenciesMap = null) => {
    const diContainer = buildDIContainer(customDependenciesMap);
    const logger = diContainer.resolve(DI_NAMES.logger);
    await initAllLoaders(logger);

    const app = express();
    applyMiddleware(app, diContainer);
    applyRoutes(app, diContainer);
    applyAllHandlers(app, diContainer);

    return app;
};

module.exports = createApp;