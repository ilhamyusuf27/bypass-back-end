const Router = require('express').Router()
const controller = require('../controllers/companyController')
// const middleware = require('../middleware/verifyToken');
// const userUpload = require("../middleware/upload");

Router.get('/company', controller.getAllCompany) // GET ALL COMPANY
Router.get('/company/find/id', controller.getCompanyById) // FIND COMPANY BY ID
Router.get('/company/find/name', controller.getCompanyByName) // FIND COMPANY BY NAME
Router.get('/company/find/email', controller.getCompanyByEmail) // FIND COMPANY BY EMAIL


Router.post('/company/add', controller.addCompany) // POST COMPANY
Router.patch('/company/edit', controller.editCompany) // EDIT COMPANY
Router.delete('/company/delete', controller.deleteCompany) // DELETE COMPANY

module.exports = Router