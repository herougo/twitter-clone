const connectToDB = require("./connectToDB");

const initAllLoaders = async () => {
    await connectToDB();
}

module.exports = initAllLoaders;