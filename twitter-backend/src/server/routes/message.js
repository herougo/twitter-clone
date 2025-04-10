const express = require('express');
const DI_NAMES = require("../dependency-injection/names");
const requireLoggedIn = require('../middleware/requireLoggedIn');

const applyMessageRouter = (app, diContainer) => {
    const router = express.Router();
    const messageService = diContainer.resolve(DI_NAMES.messageService);
    const userService = diContainer.resolve(DI_NAMES.userService);

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
            const loggedInUserId = res.locals.user.id;
            const {messages, otherUserId} = await messageService.fullFeed(channelId, loggedInUserId);
            const user = await userService.getByIdMinimal(otherUserId);
            const result = {messages, user};
            res.status(200).json(result);
        } catch (e) {
            return next(e);
        }
    });

    app.use("/", requireLoggedIn, router);
}

module.exports = {
    applyMessageRouter
};