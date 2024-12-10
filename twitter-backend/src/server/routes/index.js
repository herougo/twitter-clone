const { applyPostRouter } = require("./post");
const { applyUserRouters } = require("./user");

const applyRoutes = (app, diContainer) => {
    applyUserRouters(app, diContainer);
    applyPostRouter(app, diContainer);
}

module.exports = applyRoutes;