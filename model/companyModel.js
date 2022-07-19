const db = require('../db')

const getAllCompany = () => {
  return new Promise((resolve, reject) => {
    db.query(
      'SELECT * FROM company ORDER BY recruiter_id ASC',
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

const getCompanyById = (id) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM company WHERE recruiter_id = $1', [id], (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

const getCompanyByName = (name) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM company WHERE recruiter_name LIKE '%${name}%'`, (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

const getCompanyByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM company WHERE recruiter_email = $1`, [email], (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    }
    )
  })
}

const addCompany = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      'INSERT INTO company (recruiter_name, recruiter_email, recruiter_password, recruiter_phone, recruiter_photo, position) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [props.recruiter_name, props.recruiter_email, props.recruiter_password, props.recruiter_phone, props.recruiter_photo, props.position],
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

const editCompany = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE company SET recruiter_name = $1, recruiter_email = $2, recruiter_password = $3, recruiter_phone = $4, recruiter_photo = $5, position = $6 WHERE recruiter_id = $7',
      [props.recruiter_name, props.recruiter_email, props.recruiter_password, props.recruiter_phone, props.recruiter_photo, props.position, props.recruiter_id],
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

const deleteCompany = (id) => {
  return new Promise((resolve, reject) => {
    db.query('DELETE FROM company WHERE recruiter_id = $1', [id], (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = {
  getAllCompany,
  getCompanyById,
  getCompanyByName,
  getCompanyByEmail,
  addCompany,
  editCompany,
  deleteCompany
}
