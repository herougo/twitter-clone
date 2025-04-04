const express = require('express');
const DI_NAMES = require("../dependency-injection/names");
const requireLoggedIn = require('../middleware/requireLoggedIn');

const applyMessageRouter = (app, diContainer) => {
    const router = express.Router();
    const messageService = diContainer.resolve(DI_NAMES.messageService);

    router.post('/message', async (req, res, next) => {
        try {
            const content = req.body.content;
            const authorId = res.locals.user.id;
            const channelId = req.body.channelId;
            const sendResult = await messageService.sendMessage(
                {content, authorId, channelId}
            );
            res.status(201).json(sendResult);
        } catch (e) {
            return next(e);
        }
    });

    router.get('/channel/:channelId/messages', async (req, res, next) => {
        try {
            const channelId = req.params.channelId;
            const fullFeedResult = await messageService.fullFeed(channelId);
            res.status(200).json(fullFeedResult);
        } catch (e) {
            return next(e);
        }
    });

    app.use("/", requireLoggedIn, router);
}

module.exports = {
    applyMessageRouter
};