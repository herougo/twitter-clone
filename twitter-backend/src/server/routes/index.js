const {
    applyLogInRouter,
    applySignUpRouter,
    applyFollowRouter,
    applyUnfollowRouter
} = require("./user");

const applyRoutes = (app, diContainer) => {
    applyLogInRouter(app, diContainer);
    applySignUpRouter(app, diContainer);
    applyFollowRouter(app, diContainer);
    applyUnfollowRouter(app, diContainer);
}

module.exports = applyRoutes;