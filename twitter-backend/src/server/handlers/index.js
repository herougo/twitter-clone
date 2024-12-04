const applyErrorHandler = require("./outer/errorHandler");
const applyNotFoundHandler = require("./outer/notFoundHandler");
const { catchAndTransformMongooseError } = require('./inner');

const applyAllHandlers = (app, diContainer) => {
    applyErrorHandler(app, diContainer);
    applyNotFoundHandler(app, diContainer);
}

module.exports = {
    catchAndTransformMongooseError,
    applyAllHandlers
};