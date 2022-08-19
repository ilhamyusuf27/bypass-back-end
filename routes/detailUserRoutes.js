const Router = require("express").Router();
const controller = require("../controller/detailUserController");
const middleware = require("../middleware/auth");
Router.get("/detailUser", controller.getDetailUsers);
Router.post(
  "/detailUser/add",
  middleware.checkToken,
  controller.addDetailUsers
);
Router.get("/getAllData", controller.getAllData);
Router.get("/detailUser/findByIdUser", controller.findByIdUser);
Router.get("/getAllProfile", controller.getAllProfile);
Router.get("/getAllData/findByID", controller.getAlldataIdUser);
Router.get("/getAllProfile/findByName", controller.getProfileByName);
Router.get("/getAllProfile/findByAddress", controller.getProfileByAddress);
Router.get("/getAllProfile/fulltime", controller.getProfileFulltime);
Router.get("/getAllProfile/freelance", controller.getProfileFreelance);
Router.patch(
  "/detailUser/update",
  middleware.checkToken,
  controller.updateDetailUser
);
Router.get("/getAllProfile/findBySkill", controller.getProfileBySkill);
Router.delete(
  "/detailUser/delete",
  middleware.checkToken,
  controller.deleteDetail
);
Router.get("/getAllProfile/findByJobtitle", controller.getProfileByJobtitle);

module.exports = Router;
