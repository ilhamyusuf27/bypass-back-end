const Router = require("express").Router();
const controller = require("../controller/jobExperienceController");
Router.get("/jobExperience", controller.getJobExperience);
Router.post("/jobExperience/add", controller.addJobExperience);
Router.delete("/jobExperience/delete", controller.deleteJobExperience);
module.exports = Router;
