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
      `SELECT * FROM detailuser INNER JOIN registeruser ON detailuser.id_user = registeruser.id`,
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

const findbyIdUser = (id_user) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM detailuser WHERE id_user=$1`,
      [id_user],
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

const getDataByID = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM detailuser INNER JOIN registeruser ON detailuser.id_user = registeruser.id WHERE registeruser.id =$1`,
      [id],
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

const getDataByName = (name) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM detailuser INNER JOIN registeruser ON detailuser.id_user = registeruser.id WHERE registeruser.name ~* $1`,
      [name],
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

const getDataByAddress = (address) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM detailuser INNER JOIN registeruser ON detailuser.id_user = registeruser.id WHERE detailuser.address ~* $1`,
      [address],
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

const getDataByJob_type = (job_type) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM detailuser INNER JOIN registeruser ON detailuser.id_user = registeruser.id WHERE detailuser.job_type ~* $1`,
      [job_type],
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
  findbyIdUser,
  getDataByID,
  getDataByName,
  getDataByAddress,
  getDataByJob_type,
};
