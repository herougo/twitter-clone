const express = require('express');
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

const applySignUpRouter = (app, diContainer) => {
    const router = express.Router();
    const userService = diContainer.resolve(DI_NAMES.userService);

    router.post('/', async (req, res, next) => {
        try {
            const user = req.body.user;
            const loginResult = await userService.signUp(user);
            res.status(201).json(loginResult);
        } catch (e) {
            return next(e);
        }
    });

    app.use("/signup", router);
}

module.exports = { applySignUpRouter,  applyLogInRouter };