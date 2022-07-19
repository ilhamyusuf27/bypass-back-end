const Router = require("express").Router();
const controller = require("../controller/portofolioController");
const upload = require("../middleware/upload");

Router.get("/portofolio", controller.getPortofolio);

Router.post("/portofolio/add", upload.uploadSingle, controller.addPortofolio);
Router.delete("/portofolio/delete", controller.deletePortofolio);

module.exports = Router;
