const Router = require("express").Router();
const controller = require("../controller/hireController");
const middleware = require("../middleware/verifyToken");

Router.get("/hire", controller.getAllHire);
Router.get("/hire/find/id", controller.getHireById);
Router.post("/hire/add", middleware.checkToken, controller.addHire);

module.exports = Router;
