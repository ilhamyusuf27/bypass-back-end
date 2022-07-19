const Router = require("express").Router();
const controller = require("../controller/userController");
Router.get("/user", controller.getUsers);
Router.post("/user/add", controller.addUsers);

module.exports = Router;
