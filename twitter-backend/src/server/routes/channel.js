const express = require('express');
const DI_NAMES = require("../dependency-injection/names");
const requireLoggedIn = require('../middleware/requireLoggedIn');

const applyChannelRouter = (app, diContainer) => {
    const router = express.Router();
    const channelService = diContainer.resolve(DI_NAMES.channelService);
    const userService = diContainer.resolve(DI_NAMES.userService);

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
            const channels = await channelService.fullFeed(userId);

            const userIds = channels.map(channel => channel.userId);
            const correspondingUsers = await userService.getByIdsMinimal(userIds);

            for (let i = 0; i < channels.length; i++) {
                channels[i].username = correspondingUsers[i].username;
                channels[i].name = correspondingUsers[i].name;
                channels[i].profilePicPath = correspondingUsers[i].profilePicPath;
            }

            res.status(200).json({channels});
        } catch (e) {
            return next(e);
        }
    });

    app.use("/", requireLoggedIn, router);
}

module.exports = {
    applyChannelRouter
};