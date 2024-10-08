const mongoose = require("mongoose");
const CONFIG = require("../config");

const connectToDB = async () => {
    const connection = await mongoose.connect(CONFIG.mongoURL);
}

module.exports = connectToDB;