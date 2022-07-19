const model = require("../model/userModel");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const getUsers = async (req, res) => {
  try {
    const getData = await model.getAllUSer();
    res
      .status(200)
      .json({ user: getData?.rows, jumlahData: getData?.rowCount });
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

const addUsers = async (req, res) => {
  try {
    const { name, email, phone_number, password, confirm_pass } = req.body;
    if (!(name && email && phone_number && password && confirm_pass)) {
      res.status(400).send("data tidak boleh kosong");
    } else {
      const fixname = name.toLowerCase().trim();
      const fixemail = email.trim();
      const fixphone_number = phone_number.trim();

      const findEmail = await model.findByEmail(fixemail);

      if (findEmail?.rowCount) {
        res.status(400).send("email sudah terdaftar");
      } else {
        if (password === confirm_pass) {
          const salt = bcrypt.genSaltSync(5); // generate random string
          const fixPassword = bcrypt.hashSync(password, salt); // hash password

          const postData = await model.addedUsers(
            fixname,
            fixemail,
            fixphone_number,
            fixPassword
          );
          res.status(200).send("data berhasil di tambah");
        } else {
          res.status(400).send("password dan confirm password tidak sesuai");
        }
      }
    }
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};
module.exports = {
  getUsers,
  addUsers,
};
