const db = require("../db");

const getJobExperience = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM jobexperience ORDER BY id ASC`, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const addedJobExperience = (
  id_user,
  fixjob_title,
  fixcompany_name,
  start_date,
  end_date,
  fixdescription
) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO jobexperience ( id_user,
      job_title,
      company_name,
      start_date,
      end_date,
      description) 
    VALUES ($1,$2,$3,$4,$5,$6)`,
      [
        id_user,
        fixjob_title,
        fixcompany_name,
        start_date,
        end_date,
        fixdescription,
      ],
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

const deletedJobExperience = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM jobexperience WHERE id=$1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const findbyID = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM jobexperience WHERE id=$1`,
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

const findbyIdUser = (id_user) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM jobexperience WHERE id_user=$1`,
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

module.exports = {
  getJobExperience,
  addedJobExperience,
  deletedJobExperience,
  findbyID,
  findbyIdUser,
};
