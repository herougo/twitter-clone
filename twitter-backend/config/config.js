const dotenv = require("dotenv");

dotenv.config({path: ".env"});

const CONFIG = {
    serverPort: process.env.SERVER_PORT,
    clientUrl: process.env.CLIENT_URL,
    corsOrigin: process.env.CLIENT_URL
};

module.exports = CONFIG;