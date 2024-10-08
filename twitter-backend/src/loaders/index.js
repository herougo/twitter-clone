const CONFIG = require("../config");
const connectToDB = require("./connectToDB");

const initAllLoaders = async () => {
    await connectToDB();
    console.log(`Connected to DB at ${CONFIG.mongoURL}`);
}

module.exports = initAllLoaders;