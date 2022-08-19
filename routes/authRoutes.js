const Router = require("express").Router();
const controller = require("../controller/authController");

// LOGIN
Router.post("/login", controller.login);

module.exports = Router;
