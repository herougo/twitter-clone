const { NotFoundError } = require("../../utils/errors/expressErrors");

// for catching 404 and forwarding to error handler
const notFoundHandler = (req, res, next) => {
    const err = new NotFoundError();
    next(err);
}

module.exports = notFoundHandler;