const express = require('express');
const DI_NAMES = require("../dependency-injection/names");

const applyMessageRouter = (app, diContainer) => {
    const router = express.Router();
    const messageService = diContainer.resolve(DI_NAMES.channelService);

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

    router.get('/fullFeed', async (req, res, next) => {
        try {
            const channelId = req.body.channelId;
            const fullFeedResult = await messageService.fullFeed(channelId);
            res.status(200).json(fullFeedResult);
        } catch (e) {
            return next(e);
        }
    });

    app.use("/message", router);
}

module.exports = {
    applyMessageRouter
};