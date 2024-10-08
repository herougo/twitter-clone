const express = require("express");
const CONFIG = require("./config/config")
const applyRoutes = require("./routes");
const applyMiddleware = require("./middleware");
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