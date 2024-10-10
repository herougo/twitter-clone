const loginRoute = require("./login");
const signUpRoute = require("./signUp");

const applyRoutes = (app) => {
    app.use("/login", loginRoute);
    app.use("/signup", signUpRoute);
}

module.exports = applyRoutes;