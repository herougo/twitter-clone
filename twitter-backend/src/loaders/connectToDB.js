const mongoose = require("mongoose");
const CONFIG = require("../config");

const connectToDB = async () => {
    const connection = await mongoose.connect(CONFIG.mongoURL);
    return connection;
}

module.exports = connectToDB;