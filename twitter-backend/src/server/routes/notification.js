const express = require('express');
const DI_NAMES = require("../dependency-injection/names");

const applyNotificationRouter = (app, diContainer) => {
    const router = express.Router();
    const notificationService = diContainer.resolve(DI_NAMES.notificationService);

    router.post('/markAsRead', async (req, res, next) => {
        try {
            const notificationId = req.body.notificationId;
            await notificationService.markAsRead(notificationId);
            res.status(200).send();
        } catch (e) {
            return next(e);
        }
    });

    app.use("/notification", router);
}

module.exports = {
    applyNotificationRouter
};