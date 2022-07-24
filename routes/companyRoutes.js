const Router = require("express").Router();
const controller = require("../controller/companyController");
const middleware = require("../middleware/verifyToken");
const upload = require("../middleware/upload");

Router.get("/company", controller.getAllCompany); // GET ALL COMPANY
Router.get("/company/find/id", controller.getCompanyById); // FIND COMPANY BY ID
Router.get("/company/find/name", controller.getCompanyByName); // FIND COMPANY BY NAME
Router.get("/company/find/email", controller.getCompanyByEmail); // FIND COMPANY BY EMAIL

Router.patch("/company/edit", middleware.checkToken, controller.editCompany); // EDIT COMPANY
Router.patch(
  "/company/editPhoto",
  middleware.checkToken,
  upload.uploadCompany,
  controller.editPhotoCompany
); // EDIT PHOTO COMPANY
Router.delete(
  "/company/delete",
  middleware.checkToken,
  controller.deleteCompany
); // DELETE COMPANY

Router.post("/company/login", controller.login); // LOGIN
Router.post("/company/add", controller.registerCompany); // REGISTER COMPANY

module.exports = Router;
