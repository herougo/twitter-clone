const { UnauthorizedError } = require("../../utils/errors/expressErrors");

const requireLoggedIn = (req, res, next) => {
    try {
        if (!res.locals.user) throw new UnauthorizedError();
        return next();
    } catch (err) {
        return next(err);
    }
};

module.exports = requireLoggedIn;