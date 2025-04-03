const express = require('express');
const DI_NAMES = require("../dependency-injection/names");
const requireLoggedIn = require('../middleware/requireLoggedIn');

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
            res.status(200).send();
        } catch (e) {
            return next(e);
        }
    });

    app.use("/follow", requireLoggedIn, router);
}

const applyUnfollowRouter = (app, diContainer) => {
    const router = express.Router();
    const userService = diContainer.resolve(DI_NAMES.userService);

    router.post('/', async (req, res, next) => {
        try {
            const userId = req.body.userId;
            const followerId = req.body.followerId;
            await userService.unfollow(followerId, userId);
            res.status(200).send();
        } catch (e) {
            return next(e);
        }
    });

    app.use("/unfollow", requireLoggedIn, router);
}

const applyGetProfileRouter = (app, diContainer) => {
    const router = express.Router();
    const userService = diContainer.resolve(DI_NAMES.userService);

    router.get('/:username', async (req, res, next) => {
        try {
            const username = req.params.username;
            const loggedInUserId = req.query.loggedInUserId;
            const result = await userService.getProfile(username, loggedInUserId);
            res.status(200).json(result);
        } catch (e) {
            return next(e);
        }
    });

    app.use("/profile", requireLoggedIn, router);
}

const applyUserRouters = (app, diContainer) => {
    applyLogInRouter(app, diContainer);
    applySignUpRouter(app, diContainer);
    applyFollowRouter(app, diContainer);
    applyUnfollowRouter(app, diContainer);
    applyGetProfileRouter(app, diContainer);
}

module.exports = {
    applyUserRouters
};