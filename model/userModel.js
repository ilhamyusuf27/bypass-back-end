const db = require("../db");

// db get all user
const getAllUSer = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM registeruser ORDER BY id ASC`, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM registeruser WHERE email=$1`,
      [email],
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

const addedUsers = (fixname, fixemail, fixphone_number, fixPassword) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO registeruser (name, email, phone_number, password) 
    VALUES ($1,$2,$3,$4)`,
      [fixname, fixemail, fixphone_number, fixPassword],
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
  getAllUSer,
  findByEmail,
  addedUsers,
};
