const { applyLogInRouter, applySignUpRouter } = require("./user");

const applyRoutes = (app, diContainer) => {
    applyLogInRouter(app, diContainer);
    applySignUpRouter(app, diContainer);
}

module.exports = applyRoutes;