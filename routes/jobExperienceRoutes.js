const Router = require("express").Router();
const controller = require("../controller/jobExperienceController");
const middleware = require("../middleware/auth");
Router.get("/jobExperience", controller.getJobExperience);
Router.post(
  "/jobExperience/add",
  middleware.checkToken,
  controller.addJobExperience
);
Router.delete(
  "/jobExperience/delete",
  middleware.checkToken,
  controller.deleteJobExperience
);
Router.get("/jobExperience/findByIdUser", controller.findByIdUser);
module.exports = Router;
