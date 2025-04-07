const express = require('express');
const DI_NAMES = require("../dependency-injection/names");
const requireLoggedIn = require('../middleware/requireLoggedIn');

const applyNotificationRouter = (app, diContainer) => {
    const router = express.Router();
    const notificationService = diContainer.resolve(DI_NAMES.notificationService);

    router.post('/notification/:notificationId/read', async (req, res, next) => {
        try {
            const notificationId = req.params.notificationId;
            await notificationService.markAsRead(notificationId);
            res.status(200).send();
        } catch (e) {
            return next(e);
        }
    });

    app.use("/", requireLoggedIn, router);
}

module.exports = {
    applyNotificationRouter
};