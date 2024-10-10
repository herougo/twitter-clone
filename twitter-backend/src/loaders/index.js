const CONFIG = require("../config");
const connectToDB = require("./connectToDB");

const initAllLoaders = async (logger) => {
    await connectToDB();
    logger.log(`Connected to DB at ${CONFIG.mongoURL}`);
}

module.exports = initAllLoaders;