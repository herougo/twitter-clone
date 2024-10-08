const errorHandler = require("./errorHandler");
const notFoundHandler = require("./notFoundHandler");

const applyAllHandlers = (app) => {
    app.use(notFoundHandler);
    app.use(errorHandler);
}

module.exports = applyAllHandlers