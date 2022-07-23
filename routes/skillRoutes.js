const Router = require("express").Router();
const controller = require("../controller/skillController");
Router.get("/skill", controller.getSkill);
Router.post("/skill/add", controller.addSkill);
Router.delete("/skill/delete", controller.deleteSkill);
Router.get("/skill/findByIdUser", controller.findByIdUser);

module.exports = Router;
