const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const CONFIG = require("../../config");
const authenticateJWT = require("./authenticateJWT");
const applyServerStorageMiddleware = require("./serverStorage");

const applyMiddleware = (app, diContainer) => {
    // transforms req.body from string to json if json data is passed and
    // content-type is application/json
    app.use(express.json());
    
    // URL-encoded data will be parsed using the
    // - query-string library
    // instead of the
    // - qs library (allows for nested object query strings)
    // Setting to false seems to make things simpler
    app.use(express.urlencoded({extended: false}));

    // this prevents BROWSER fetch/axios requests from origins outside
    // CONFIG.corsOrigin
    app.use(cors({
        origin: CONFIG.corsOrigin
    }));

    app.use(authenticateJWT);

    // equivalent to
    // app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
    // prints e.g. "GET / 404 139 - 7.136 ms
    // commented out to avoid spamming in tests
    app.use(morgan('tiny'));

    applyServerStorageMiddleware(app, diContainer);
}

module.exports = applyMiddleware;