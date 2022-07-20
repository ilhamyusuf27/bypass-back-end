const db = require("../db");

const getAllPortofolio = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM portofolio ORDER BY id ASC`, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const addedPortofolio = (
  id_user,
  fixaplication_title,
  fixlink_repository,
  fixportofolio_type,
  image
) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO portofolio (id_user, aplication_title, link_repository, portofolio_type, image) 
    VALUES ($1,$2,$3,$4,$5)`,
      [
        id_user,
        fixaplication_title,
        fixlink_repository,
        fixportofolio_type,
        image,
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

const deletedPortofolio = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM portofolio WHERE id=$1`, [id], (error, result) => {
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
    db.query(`SELECT * FROM portofolio WHERE id=$1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  getAllPortofolio,
  addedPortofolio,
  deletedPortofolio,
  findbyID,
};
