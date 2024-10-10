const dotenv = require("dotenv");

dotenv.config({path: ".env"});

const CONFIG = {
    serverPort: process.env.SERVER_PORT,
    clientUrl: process.env.CLIENT_URL,
    corsOrigin: process.env.CLIENT_URL,
    mongoURL: process.env.MONGO_URL,
    jwtSecretKey: process.env.JWT_SECRET_KEY
};

module.exports = CONFIG;