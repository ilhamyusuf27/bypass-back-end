const Router = require("express").Router();
const controller = require("../controller/userController");
const upload = require("../middleware/upload");
const middleware = require("../middleware/auth");

Router.get("/user", controller.getUsers);
Router.post("/user/add", controller.addUsers);
Router.patch(
  "/user/editPhoto",
  middleware.checkToken,
  upload.uploadprofile,
  controller.editPhoto
);
Router.get("/user/findByID", controller.findUserByID);
Router.get("/user/findByEmail", controller.findUserByEmail);
Router.delete("/user/delete", middleware.checkToken, controller.deleteUser);
Router.patch("/user/edit", middleware.checkToken, controller.editUser);
Router.patch(
  "/user/editDetail",
  middleware.checkToken,
  controller.updateDetailUser
);
Router.get("/user/findByName", controller.getProfileByName);
Router.get("/user/findByAddress", controller.getProfileByAddress);
Router.get("/user/findBySkill", controller.getProfileBySkill);
Router.get("/user/findByJobtitle", controller.getProfileByJobtitle);

module.exports = Router;
