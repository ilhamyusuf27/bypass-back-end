const Router = require('express').Router()
const controller = require('../controller/hireController')

Router.get('/hire', controller.getAllHire)
Router.get('/hire/find/id', controller.getHireById)
Router.post('/hire/add', controller.addHire)

module.exports = Router