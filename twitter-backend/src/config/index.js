const dotenv = require("dotenv");
const { ENVIRONMENTS } = require("../utils/enums");

const nodeEnv = process.env.NODE_ENV;
const envPath = nodeEnv === ENVIRONMENTS.test ? "test.env" : ".env";

dotenv.config({path: envPath});

const CONFIG = {
    nodeEnv,
    serverPort: process.env.SERVER_PORT,
    clientUrl: process.env.CLIENT_URL,
    corsOrigin: process.env.CLIENT_URL,
    mongoURL: process.env.MONGO_URL,
    jwtSecretKey: process.env.JWT_SECRET_KEY
};

module.exports = CONFIG;