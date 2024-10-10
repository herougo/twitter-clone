class Logger {
    error(text) {
        console.error(text);
    }

    log(text) {
        console.log(text);
    }

    warn(text) {
        console.warn(text);
    }

    debug(text) {
        console.debug(text);
    }
}

module.exports = Logger;