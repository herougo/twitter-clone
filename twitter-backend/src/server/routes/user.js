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
            const userData = req.body.user;
            const loginResult = await userService.signUp(userData);
            res.status(201).json(loginResult);
        } catch (e) {
            return next(e);
        }
    });

    app.use("/signup", router);
}

const applyFollowRouter = (app, diContainer) => {
    const router = express.Router();
    const userService = diContainer.resolve(DI_NAMES.userService);

    router.post('/', async (req, res, next) => {
        try {
            const userId = req.body.userId;
            const followerId = req.body.followerId;
            await userService.follow(followerId, userId);
            res.status(200);
        } catch (e) {
            return next(e);
        }
    });

    app.use("/follow", router);
}

const applyUnfollowRouter = (app, diContainer) => {
    const router = express.Router();
    const userService = diContainer.resolve(DI_NAMES.userService);

    router.post('/', async (req, res, next) => {
        try {
            const userId = req.body.userId;
            const followerId = req.body.followerId;
            await userService.unfollow(followerId, userId);
            res.status(200);
        } catch (e) {
            return next(e);
        }
    });

    app.use("/unfollow", router);
}

module.exports = {
    applySignUpRouter,
    applyLogInRouter,
    applyFollowRouter,
    applyUnfollowRouter
};