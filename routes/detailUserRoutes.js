const Router = require("express").Router();
const controller = require("../controller/detailUserController");
Router.get("/detailUser", controller.getDetailUsers);
Router.post("/detailUser/add", controller.addDetailUsers);
Router.get("/getAllData", controller.getAllData);
module.exports = Router;
