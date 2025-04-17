const CONFIG = require("./config");
const createApp = require("./server/createApp");
const createServer = require("./server/createServer");

const startApp = async (customDependenciesMap = null) => {
    const { app, diContainer } = await createApp(customDependenciesMap);
    console.log(`Node Environment: ${CONFIG.nodeEnv}`);
    const server = createServer(app, diContainer);

    server.listen(CONFIG.serverPort, () => {
        console.log(`Server listening on ${CONFIG.serverPort}`);
    });
}

startApp();