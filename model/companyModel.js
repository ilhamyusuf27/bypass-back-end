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
    db.query('SELECT * FROM company WHERE recruiter_email = $1', [email], (error, result) => {
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
      'INSERT INTO company (recruiter_name, recruiter_email, company_name, recruiter_position, recruiter_phone, recruiter_password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [props.recruiter_name, props.recruiter_email, props.company_name, props.recruiter_position, props.recruiter_phone, props.recruiter_password],
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
      'UPDATE company SET company_name = $1, business_fields = $2, company_city = $3, company_description = $4, recruiter_email = $5, company_instagram = $6, recruiter_phone = $7, company_linkedin = $8 WHERE recruiter_id = $9',
      [props.company_name, props.business_fields, props.company_city, props.company_description, props.recruiter_email, props.company_instagram, props.recruiter_phone, props.company_linkedin, props.recruiter_id],
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

const editPhotoCompany = (photo, id) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE company SET recruiter_photo = $1 WHERE recruiter_id = $2', [photo, id], (error, result) => {
      if (error) {
        reject(error)
      } else {
        resolve(result)
      }
    })
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
  editPhotoCompany,
  deleteCompany
}
