const Router = require("express").Router();
const controller = require("../controller/sosmedController");
const middleware = require("../middleware/auth");
Router.get("/sosmed", controller.getSosmed);
Router.post("/sosmed/add", middleware.checkToken, controller.addSosmed);
Router.delete("/sosmed/delete", middleware.checkToken, controller.deleteSosmed);
Router.get("/sosmed/findByIdUser", controller.findByIdUser);
Router.patch(
  "/sosmed/update",
  middleware.checkToken,
  controller.updateUserSosmed
);
module.exports = Router;
