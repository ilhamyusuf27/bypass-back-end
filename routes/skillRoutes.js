const Router = require("express").Router();
const controller = require("../controller/skillController");
const middleware = require("../middleware/auth");
Router.get("/skill", controller.getSkill);
Router.post("/skill/add", middleware.checkToken, controller.addSkill);
Router.delete("/skill/delete", middleware.checkToken, controller.deleteSkill);
Router.patch("/skill/update", middleware.checkToken, controller.updateSkill);
Router.get("/skill/findByIdUser", controller.findByIdUser);

module.exports = Router;
