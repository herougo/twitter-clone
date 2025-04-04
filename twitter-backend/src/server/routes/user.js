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

    router.post('/user/id/:followingId/follow', async (req, res, next) => {
        try {
            const userId = req.params.followingId;
            const followerId = res.locals.user.id;
            await userService.follow(followerId, userId);
            res.status(200).send();
        } catch (e) {
            return next(e);
        }
    });

    app.use("/", requireLoggedIn, router);
}

const applyUnfollowRouter = (app, diContainer) => {
    const router = express.Router();
    const userService = diContainer.resolve(DI_NAMES.userService);

    router.delete('/user/id/:followingId/follow', async (req, res, next) => {
        try {
            const userId = req.params.followingId;
            const followerId = res.locals.user.id;
            await userService.unfollow(followerId, userId);
            res.status(200).send();
        } catch (e) {
            return next(e);
        }
    });

    app.use("/", requireLoggedIn, router);
}

const applyGetProfileRouter = (app, diContainer) => {
    const router = express.Router();
    const userService = diContainer.resolve(DI_NAMES.userService);

    router.get('/:username', async (req, res, next) => {
        try {
            const username = req.params.username;
            const loggedInUserId = res.locals.user.id;
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