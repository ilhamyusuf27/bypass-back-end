const express = require('express')
require('dotenv').config()
const db = require('./db')

const app = express()
const bodyParser = require('body-parser')
const helmet = require('helmet')
const port = 8100

const companyRoutes = require('./routes/companyRoutes')

app.use(helmet())
app.use(express.json()) // parse application/json
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded

app.use('/', companyRoutes) // Define all company

app.listen(port, () => { // end of bottom code
  console.log(`Example app listening on port ${port}`)
})
