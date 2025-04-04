const express = require('express');
const DI_NAMES = require("../dependency-injection/names");
const requireLoggedIn = require('../middleware/requireLoggedIn');

const applyChannelRouter = (app, diContainer) => {
    const router = express.Router();
    const channelService = diContainer.resolve(DI_NAMES.channelService);

    router.post('/channel', async (req, res, next) => {
        try {
            const userIds = req.body.userIds;
            const openResult = await channelService.openDirectMessageChannel({userIds});
            res.status(200).json(openResult);
        } catch (e) {
            return next(e);
        }
    });

    router.get('/channel', async (req, res, next) => {
        try {
            const userId = res.locals.user.id;
            const fullFeedResult = await channelService.fullFeed(userId);
            res.status(200).json(fullFeedResult);
        } catch (e) {
            return next(e);
        }
    });

    app.use("/", requireLoggedIn, router);
}

module.exports = {
    applyChannelRouter
};