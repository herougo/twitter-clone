const express = require('express');
const DI_NAMES = require("../dependency-injection/names");
const requireLoggedIn = require('../middleware/requireLoggedIn');

const applyMessageRouter = (app, diContainer) => {
    const router = express.Router();
    const messageService = diContainer.resolve(DI_NAMES.messageService);

    router.post('/send', async (req, res, next) => {
        try {
            const content = req.body.content;
            const authorId = req.body.authorId;
            const channelId = req.body.channelId;
            const sendResult = await messageService.sendMessage(
                {content, authorId, channelId}
            );
            res.status(201).json(sendResult);
        } catch (e) {
            return next(e);
        }
    });

    router.get('/fullFeed/:channelId', async (req, res, next) => {
        try {
            const channelId = req.params.channelId;
            const fullFeedResult = await messageService.fullFeed(channelId);
            res.status(200).json(fullFeedResult);
        } catch (e) {
            return next(e);
        }
    });

    app.use("/message", requireLoggedIn, router);
}

module.exports = {
    applyMessageRouter
};