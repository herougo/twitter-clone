const express = require("express");
const CONFIG = require("./config/config")
const applyRoutes = require("./routes");
const applyMiddleware = require("./middleware");

const app = express();
applyMiddleware(app);
applyRoutes(app);

app.listen(CONFIG.port, () => {
    console.log(`Server listening on ${CONFIG.port}`);
});