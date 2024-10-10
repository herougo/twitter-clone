const CONFIG = require("./config");
const createApp = require("./server/app");

const startApp = async (mockedDependenciesMap = null) => {
    const app = await createApp(mockedDependenciesMap);

    app.listen(CONFIG.serverPort, () => {
        console.log(`Server listening on ${CONFIG.serverPort}`);
    });
}

startApp();