const model = require('../model/companyModel');
const bcrypt = require("bcrypt");
const path = require("path");

const getAllCompany = async (req, res) => {
  try {
    const getData = await model.getAllCompany()

    res.send({ data: getData.rows, jumlahData: getData.rowCount })
  } catch (error) {
    console.log('error', error)
    res.status(400).send(`Something's wrong`)
  }
}

const getCompanyById = async (req, res) => {
  try {
    const { recruiter_id } = req.body
    const getData = await model.getCompanyById(recruiter_id)

    if (getData.rowCount > 0) {
      if (parseInt(recruiter_id)) {
        res.send({ data: getData.rows, jumlahData: getData.rowCount })
      } else {
        res.status(400).send('Invalid number!')
      }
    } else 
      res.status(400).send('Recruiter id not found!')
  } catch (error) {
    console.log('error', error)
    res.status(400).send(`Something's wrong`)
  }
}

const getCompanyByName = async (req, res) => {
  try {
    const { recruiter_name } = req.body
    const getData = await model.getCompanyByName(recruiter_name)

    res.send({
      data: getData.rows,
      jumlahData: getData.rowCount
    })
  } catch (error) {
    res.status(400).send(`Something's wrong`)
  }
}

const getCompanyByEmail = async (req, res) => {
  try {
    const { recruiter_email } = req.body
    const getData = await model.getCompanyByEmail(recruiter_email)

    if (getData.rowCount > 0) {
      res.send({
        data: getData.rows,
        jumlahData: getData.rowCount
      })
    } else 
      res.status(400).send('Recruiter Email not found!')

  } catch (error) {
    console.log("error",error)
    res.status(400).send(`Something's wrong`)
  }
}

const addCompany = async (req, res) => {
  try {
    const { recruiter_name, recruiter_email, recruiter_password, recruiter_phone, recruiter_photo, position } = req.body;
    const dataEmail = await model.getCompanyByEmail(recruiter_email)

    const salt = bcrypt.genSaltSync(15); // generate random string
    const hash = bcrypt.hashSync(recruiter_password, salt); // hash password
     
    if ( dataEmail.rowCount > 0) {
      res.status(409).send(`Error : Duplicate recruiter email!`)
    } else {
      await model.addCompany({ recruiter_name, recruiter_email, recruiter_password: hash, recruiter_phone, recruiter_photo, position })
      res.status(200).send(`Success create user`)
    }
  } catch (error) {
    console.log('error', error)
    res.status(400).send(`Something's wrong`)
  }
}

// const editUser = async (req, res) => {
//   try {
//     const { user_id, name, email, password, phone, } = req.body
//     const dataEmail = await model.getByEmail(email)

//     if ( dataEmail.rowCount > 0) {
//       res.status(409).send(`duplicate email`)
//     } else {
//       const getdata = await model.editUser({user_id, name, email, password, phone, user_photo: req.file.path})
//       res.status(200).send(`Success edit user id ${user_id}`)
//     }
//   } catch (error) {
//     console.log(error)
//     res.status(400).send('ada yang error')
//   }
// }  

const editCompany = async (req, res) => {
  try {
    const { recruiter_id, recruiter_name, recruiter_email, recruiter_password, recruiter_phone, recruiter_photo, position } = req.body
    const dataEmail = await model.getCompanyByEmail(recruiter_email)

    const salt = bcrypt.genSaltSync(15); // generate random string
    const hash = bcrypt.hashSync(recruiter_password, salt); // hash password

    if ( dataEmail.rowCount > 0) {
      res.status(409).send(`duplicate recruiter email`)
    } else {
      await model.editCompany({recruiter_name, recruiter_email, recruiter_password: hash, recruiter_phone, recruiter_photo, position})
      res.status(200).send(`Success edit user id ${recruiter_id}`)
    }
  } catch (error) {
    console.log(error)
    res.status(400).send('Something went wrong!')
  }
}

const deleteCompany = async (req, res) => {
  try {
    const { recruiter_id } = req.body

    // Check user by id
    const getData = await model.getCompanyById(recruiter_id)

    if (getData.rowCount > 0) {
      const deleteCompany = await model.deleteCompany(recruiter_id)

      if (deleteCompany) {
        res.send(`Successfully deleted company : ${recruiter_id}`)
      } else {
        res.status(400).send('User failed to delete!')
      }
    } else {
      res.status(400).send('User not found!')
    }
  } catch (error) {
    console.log(error)
    res.status(400).send('Something went wrong!')
  }
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