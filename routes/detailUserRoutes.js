const Router = require("express").Router();
const controller = require("../controller/detailUserController");
Router.get("/detailUser", controller.getDetailUsers);
Router.post("/detailUser/add", controller.addDetailUsers);

module.exports = Router;
