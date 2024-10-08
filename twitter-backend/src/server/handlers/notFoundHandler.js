// for catching 404 and forwarding to error handler
const notFoundHandler = (req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
}

module.exports = notFoundHandler;