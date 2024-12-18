const { applyChannelRouter } = require("./channel");
const { applyMessageRouter } = require("./message");
const { applyNotificationRouter } = require("./notification");
const { applyPostRouter } = require("./post");
const { applyUserRouters } = require("./user");

const applyRoutes = (app, diContainer) => {
    applyUserRouters(app, diContainer);
    applyPostRouter(app, diContainer);
    applyNotificationRouter(app, diContainer);
    applyChannelRouter(app, diContainer);
    applyMessageRouter(app, diContainer);
}

module.exports = applyRoutes;