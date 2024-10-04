const express = require("express");

const applyMiddleware = (app) => {
    // TODO
    
    // populates req.body if json data is passed and
    // content-type is application/json
    app.use(express.json());
    
    // URL-encoded data will be parsed using the
    // - query-string library
    // instead of the
    // - qs library (allows for nested object query strings)
    // Setting to false seems to make things simpler
    app.use(express.urlencoded({extended: false}))
}

module.exports = applyMiddleware;