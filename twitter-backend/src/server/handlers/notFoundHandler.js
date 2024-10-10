const { NotFoundError } = require("../../utils/errors/expressErrors");

const applyNotFoundHandler = (app, diContainer) => {
    // for catching 404 and forwarding to error handler
    const notFoundHandler = (req, res, next) => {
        const err = new NotFoundError();
        next(err);
    }

    app.use(notFoundHandler);
}


module.exports = applyNotFoundHandler;