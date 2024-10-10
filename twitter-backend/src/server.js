const CONFIG = require("./config");
const createApp = require("./server/app");

const startApp = async (customDependenciesMap = null) => {
    const app = await createApp(customDependenciesMap);

    app.listen(CONFIG.serverPort, () => {
        console.log(`Server listening on ${CONFIG.serverPort}`);
    });
}

startApp();