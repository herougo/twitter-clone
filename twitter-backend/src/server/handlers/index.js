const applyErrorHandler = require("./errorHandler");
const applyNotFoundHandler = require("./notFoundHandler");

const applyAllHandlers = (app, diContainer) => {
    applyErrorHandler(app, diContainer);
    applyNotFoundHandler(app, diContainer);
}

module.exports = applyAllHandlers