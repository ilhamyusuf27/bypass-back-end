const db = require("../db");

const getDetailUSer = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM detailuser ORDER BY id ASC`, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const addedDetailUsers = (
  id_user,
  fixjob_title,
  fixaddress,
  fixjob_type,
  fixdescription
) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO detailuser (id_user, job_title, address, job_type, description) 
    VALUES ($1,$2,$3,$4,$5)`,
      [id_user, fixjob_title, fixaddress, fixjob_type, fixdescription],
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const getAllDataUser = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM detailuser JOIN registeruser ON detailuser.id_user = registeruser.id`,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

module.exports = {
  getDetailUSer,
  addedDetailUsers,
  getAllDataUser,
};
