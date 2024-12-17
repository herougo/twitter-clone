const express = require('express');
const DI_NAMES = require("../dependency-injection/names");

const applyChannelRouter = (app, diContainer) => {
    const router = express.Router();
    const channelService = diContainer.resolve(DI_NAMES.channelService);

    router.post('/open', async (req, res, next) => {
        try {
            const userIds = req.body.userIds;
            const openResult = await channelService.openDirectMessageChannel({userIds});
            res.status(200).json(openResult);
        } catch (e) {
            return next(e);
        }
    });

    app.use("/channel", router);
}

module.exports = {
    applyChannelRouter
};