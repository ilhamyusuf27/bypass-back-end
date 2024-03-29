const db = require("../db");

const getAllSkill = () => {
  return new Promise((resolve, reject) => {
    db.query(`SELECT * FROM skill ORDER BY id ASC`, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const addedSkill = (id_user, fixskill) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO skill (id_user, skill) 
    VALUES ($1,$2)`,
      [id_user, fixskill],
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

const deletedSkill = (id) => {
  return new Promise((resolve, reject) => {
    db.query(`DELETE FROM skill WHERE id=$1`, [id], (error, result) => {
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
    db.query(`SELECT * FROM skill WHERE id=$1`, [id], (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};

const findbyIdUser = (id_user) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM skill WHERE id_user=$1`,
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

const updateSkillData = (props) => {
  console.log(props);
  const { id_user, id, changesSkill } = props;
  return new Promise((resolve, reject) => {
    db.query(
      `UPDATE skill SET skill=$1 WHERE id_user=$2 AND id=$3`,
      [changesSkill, id_user, id],
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
  getAllSkill,
  addedSkill,
  deletedSkill,
  findbyID,
  findbyIdUser,
  updateSkillData,
};
