const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const CONFIG = require("../config/config");

const applyMiddleware = (app) => {
    // populates req.body if json data is passed and
    // content-type is application/json
    app.use(express.json());
    
    // URL-encoded data will be parsed using the
    // - query-string library
    // instead of the
    // - qs library (allows for nested object query strings)
    // Setting to false seems to make things simpler
    app.use(express.urlencoded({extended: false}))

    // this prevents BROWSER fetch/axios requests from origins outside
    // CONFIG.corsOrigin
    app.use(cors({
        origin: CONFIG.corsOrigin
    }))

    // equivalent to
    // app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
    // prints e.g. "GET / 404 139 - 7.136 ms
    app.use(morgan('tiny'));
}

module.exports = applyMiddleware;