const db = require("../db");

const getAllSosmed = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM socialmedia ORDER BY id ASC`, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const addedSosmed = (id_user, fixinstagram, fixgithub, fixgitlab) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO socialmedia (id_user, instagram, github, gitlab) 
    VALUES ($1,$2,$3,$4)`,
      [id_user, fixinstagram, fixgithub, fixgitlab],
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

const editSosmed = (props) => {
  return new Promise((resolve, reject) => {
    db.query(
      'UPDATE socialmedia SET id_user = $1, instagram = $2, github = $3, gitlab = $4 WHERE id = $5',
      [props.id_user, props.instagram, props.github, props.gitlab, props.id],
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

const deletedSosmed = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM socialmedia WHERE id=$1`, [id], (error, result) => {
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
    db.query(`SELECT * FROM socialmedia WHERE id=$1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  getAllSosmed,
  addedSosmed,
  editSosmed,
  deletedSosmed,
  findbyID,
};
