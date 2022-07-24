const cloudinary = require("../middleware/cloudinary");
const model = require("../model/companyModel");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const { recruiter_email, recruiter_password } = req.body;
    // console.log(req.body)
    const getEmailCompany = await model.getCompanyByEmail(recruiter_email);

    if (getEmailCompany.rowCount) {
      // validate password
      const checkPassword = bcrypt.compareSync(
        recruiter_password,
        getEmailCompany.rows[0].recruiter_password
      ); // true or false

      if (checkPassword) {
        const token = jwt.sign(
          getEmailCompany.rows[0],
          process.env.SECRET_KEY,
          { expiresIn: "24h" }
        );

        res
          .status(200)
          .send({
            token,
            data: { ...getEmailCompany.rows[0], recruiter_password: null },
          });
      } else {
        res.status(401).send("Invalid password!");
      }
    } else {
      res.status(400).send("User not register!");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong!");
  }
};

const getAllCompany = async (req, res) => {
  try {
    const getData = await model.getAllCompany();

    res.status(200).json({
      company: getData?.rows.map((e) => {
        return { ...e, recruiter_password: null };
      }),
      jumlahData: getData?.rowCount,
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send("Something's wrong");
  }
};

const getCompanyById = async (req, res) => {
  try {
    const { recruiter_id } = req.query;
    const getData = await model.getCompanyById(recruiter_id);

    if (getData.rowCount > 0) {
      if (parseInt(recruiter_id)) {
        res.status(200).json({
          company: getData?.rows.map((e) => {
            return { ...e, recruiter_password: null };
          }),
          jumlahData: getData?.rowCount,
        });
      } else {
        res.status(400).send("Invalid number!");
      }
    } else {
      res.status(400).send("Recruiter id not found!");
    }
  } catch (error) {
    console.log("error", error);
    res.status(400).send("Something's wrong");
  }
};

const getCompanyByName = async (req, res) => {
  try {
    const { recruiter_name } = req.query;
    const getData = await model.getCompanyByName(recruiter_name);

    res.status(200).json({
      company: getData?.rows.map((e) => {
        return { ...e, recruiter_password: null };
      }),
      jumlahData: getData?.rowCount,
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send("Something's wrong");
  }
};

const getCompanyByEmail = async (req, res) => {
  try {
    const { recruiter_email } = req.query;
    const getData = await model.getCompanyByEmail(recruiter_email);

    if (getData.rowCount > 0) {
      res.status(200).json({
        company: getData?.rows.map((e) => {
          return { ...e, recruiter_password: null };
        }),
        jumlahData: getData?.rowCount,
      });
    } else {
      res.status(400).send("Recruiter Email not found!");
    }
  } catch (error) {
    console.log("error", error);
    res.status(400).send("Something's wrong");
  }
};

const registerCompany = async (req, res) => {
  try {
    const {
      recruiter_id,
      company_name,
      business_fields,
      company_city,
      company_description,
      recruiter_email,
      company_instagram,
      recruiter_phone,
      company_linkedin,
    } = req.body;
    const dataEmail = await model.getCompanyByEmail(recruiter_email);

    if (dataEmail.rowCount > 0) {
      res.status(409).send("duplicate recruiter email");
    } else {
      await model.editCompany({
        recruiter_id,
        company_name,
        business_fields,
        company_city,
        company_description,
        recruiter_email,
        company_instagram,
        recruiter_phone,
        company_linkedin,
      });
      res.status(200).send(`Success edit user id ${recruiter_id}`);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong!");
  }
};

const editCompany = async (req, res) => {
  try {
    const {
      recruiter_id,
      company_name,
      business_fields,
      company_city,
      company_description,
      recruiter_email,
      company_instagram,
      recruiter_phone,
      company_linkedin,
    } = req.body;
    const dataEmail = await model.getCompanyByEmail(recruiter_email);

    if (dataEmail.rowCount > 0) {
      res.status(409).send("duplicate recruiter email");
    } else {
      await model.editCompany({
        recruiter_id,
        company_name,
        business_fields,
        company_city,
        company_description,
        recruiter_email,
        company_instagram,
        recruiter_phone,
        company_linkedin,
      });
      res.status(200).send(`Success edit user id ${recruiter_id}`);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong!");
  }
};

const editPhotoCompany = async (req, res) => {
  try {
    const { recruiter_id } = req.body;
    const getCompanyById = await model.getCompanyById(recruiter_id);

    if (getCompanyById?.rowCount) {
      if (req?.file) {
        const uploadImage = await cloudinary.uploader.upload(req.file.path, {
          folder: "company-profile",
        });
        const recruiter_photo = uploadImage.secure_url;

        await model.editPhotoCompany(recruiter_photo, recruiter_id);
        res.status(200).send("Company photo successfully edited");
      } else {
        res.status(400).send("Please select the file to upload!");
      }
    } else {
      res.status(400).send("Error: Recruiter_id not registered!");
    }
  } catch (error) {
    console.log("err", error);
    res.status(400).send("Something went wrong!");
  }
};

const deleteCompany = async (req, res) => {
  try {
    const { recruiter_id } = req.query;
    const getData = await model.getCompanyById(recruiter_id);

    if (getData.rowCount > 0) {
      const deleteCompany = await model.deleteCompany(recruiter_id);

      if (deleteCompany) {
        res.send(`Successfully deleted company : ${recruiter_id}`);
      } else {
        res.status(400).send("User failed to delete!");
      }
    } else {
      res.status(400).send("User not found!");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong!");
  }
};

module.exports = {
  login,
  getAllCompany,
  getCompanyById,
  getCompanyByName,
  getCompanyByEmail,
  registerCompany,
  editCompany,
  editPhotoCompany,
  deleteCompany,
};
