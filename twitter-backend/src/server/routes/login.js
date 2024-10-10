const express = require('express');
const { ExpressError } = require('../../utils/errors/expressErrors');
const DI_NAMES = require("../dependency-injection/names");

const applyLogInRouter = (app, diContainer) => {
    const router = express.Router();
    const userService = diContainer.resolve(DI_NAMES.userService);

    router.post('/', async (req, res, next) => {
        try {
            const username = req.body.username;
            const password = req.body.password;
        
            const loginResult = await userService.logIn(username, password);
            res.status(200).json(loginResult);
        } catch (e) {
            return next(e);
        }
    });
    app.use("/login", router);
}

module.exports = applyLogInRouter;