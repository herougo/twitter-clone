const express = require("express");
const applyRoutes = require("./routes");
const applyMiddleware = require("./middleware");
const initAllLoaders = require("../loaders");
const applyAllHandlers = require("./handlers");
const buildDIContainer = require("./dependency-injection/buildDIContainer");

const createApp = async (mockedDependenciesMap = null) => {
    const diContainer = buildDIContainer(mockedDependenciesMap);
    await initAllLoaders();

    const app = express();
    applyMiddleware(app, diContainer);
    applyRoutes(app, diContainer);
    applyAllHandlers(app, diContainer);

    return app;
};

module.exports = createApp;