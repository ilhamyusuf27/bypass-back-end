const db = require('../db')

const getAllHire = () => {
    return new Promise((resolve, reject) => {
    db.query(
     'SELECT * FROM hire ORDER BY hire_id ASC',
      (error, result) => {
        if (error) {
          console.log('error', error)
          reject(error)
        } else {
          resolve(result)
        }
      }
    )
  })
}

const getHireById = (id) => {
    return new Promise((resolve, reject) => {
    db.query('SELECT * FROM hire WHERE hire_id = $1', [id], (error, result) => {
        if (error) {
        reject(error)
        } else {
        resolve(result)
       }
    })
  })
}

const addHire = (props) => {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO hire (hire_message, hire_name, hire_email, hire_phone, hire_description) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [props.hire_message, props.hire_name, props.hire_email, props.hire_phone, props.hire_description],
        (error, result) => {
          if (error) {
            reject(error)
          } else {
            resolve(result)
          }
        }
      )
    })
}

module.exports = {
    getAllHire,
    getHireById,
    addHire
}