const jwt = require('jsonwebtoken')
require('dotenv').config()

const checkToken = async (req, res, next) => {
  try {
    if (req.headers?.authorization) {
      const token = req.headers?.authorization
      const decoded = jwt.verify(
        token.substring(7, token.length),
        process.env.SECRET_KEY
      )
      if (decoded) {
        next()
      }
    } else {
      res.status(401).send('Please enter token!')
    }
  } catch (error) {
    res.status(401).send('Error: Invalid token!')
  }
}

module.exports = { checkToken }
