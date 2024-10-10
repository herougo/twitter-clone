const applyLogInRouter = require("./login");
const applySignUpRouter = require("./signUp");

const applyRoutes = (app, diContainer) => {
    applyLogInRouter(app, diContainer);
    applySignUpRouter(app, diContainer);
}

module.exports = applyRoutes;