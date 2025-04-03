const jwt = require("jsonwebtoken");
const CONFIG = require("../../config");

const authenticateJWT = (req, res, next) => {
    try {
        const authHeader = req.headers && req.headers.authorization;
        if (authHeader) {
            const token = authHeader.replace(/^[Bb]earer /, "").trim();
            // The variables set on res.locals are available within a single
            // request-response cycle, and will not be shared between requests
            res.locals.user = jwt.verify(token, CONFIG.jwtSecretKey);
        }
        return next();
    } catch (err) {
        return next();
    }
};

module.exports = authenticateJWT;