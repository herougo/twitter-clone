const CONFIG = require("./config");
const createApp = require("./server/app");

const startApp = async (customDependenciesMap = null) => {
    const { app, diContainer } = await createApp(customDependenciesMap);
    console.log(`Node Environment: ${CONFIG.nodeEnv}`);

    app.listen(CONFIG.serverPort, () => {
        console.log(`Server listening on ${CONFIG.serverPort}`);
    });
}

startApp();