const { ExpressError } = require("../../utils/errors/expressErrors");
const logger = require("../../utils/logger");

const errorHandler = (err, req, res, next) => {
    if (!(err instanceof ExpressError)) {
        // another kind of error slipped through somehow
        // (probably in the route file)
        logger.error(`error handler saw a non-express error: ${err}`);
        return res.status(500).send();
    }

    res.status(err.status || 500);
    res.json({
        errors: {
            message: err.message,
        },
    });
};

module.exports = errorHandler;