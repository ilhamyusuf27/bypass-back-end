const Router = require("express").Router();
const controller = require("../controller/sosmedController");
Router.get("/sosmed", controller.getSosmed);
Router.post("/sosmed/add", controller.addSosmed);
Router.delete("/sosmed/delete", controller.deleteSosmed);
Router.get("/sosmed/findByIdUser", controller.findByIdUser);
module.exports = Router;
