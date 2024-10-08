const express = require("express");
const CONFIG = require("./config")
const applyRoutes = require("./server/routes");
const applyMiddleware = require("./server/middleware");
const initAllLoaders = require("./loaders");

const startApp = async () => {
    await initAllLoaders();

    const app = express();
    applyMiddleware(app);
    applyRoutes(app);

    app.listen(CONFIG.serverPort, () => {
        console.log(`Server listening on ${CONFIG.serverPort}`);
    });
};

startApp();