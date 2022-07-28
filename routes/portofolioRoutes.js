const Router = require("express").Router();
const controller = require("../controller/portofolioController");
const upload = require("../middleware/upload");
const middleware = require("../middleware/auth");

Router.get("/portofolio", controller.getPortofolio);
Router.get("/portofolio/findByIdUser", controller.findByIdUser);
Router.post(
  "/portofolio/add",
  middleware.checkToken,
  upload.uploadSingle,
  controller.addPortofolio
);
Router.delete(
  "/portofolio/delete",
  middleware.checkToken,
  controller.deletePortofolio
);

module.exports = Router;
