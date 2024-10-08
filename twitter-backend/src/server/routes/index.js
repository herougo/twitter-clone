const loginRoute = require("./login");

const applyRoutes = (app) => {
    app.use("/login", loginRoute);
}

module.exports = applyRoutes;