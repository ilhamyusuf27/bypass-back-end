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
		db.query(`SELECT * FROM registeruser WHERE email=$1`, [email], (error, result) => {
			if (error) {
				reject(error);
			} else {
				resolve(result);
			}
		});
	});
};

const addedUser = (fixname, fixemail, fixphone_number, fixPassword) => {
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

const findbyID = (id) => {
	return new Promise((resolve, reject) => {
		db.query(`SELECT * FROM registeruser WHERE id=$1`, [id], (error, result) => {
			if (error) {
				reject(error);
			} else {
				resolve(result);
			}
		});
	});
};

const editedPhoto = (foto, id) => {
	return new Promise((resolve, reject) => {
		db.query(`UPDATE registeruser SET user_photo=$1 WHERE id=$2`, [foto, id], (error, result) => {
			if (error) {
				reject(error);
			} else {
				resolve(result);
			}
		});
	});
};

const editedUser = (inputName, inputEmail, inputPhone, inputRole, inputIs_hired, id) => {
	return new Promise((resolve, reject) => {
		db.query(`UPDATE registeruser SET name= $1, email=$2, phone_number=$3, role=$4, is_hired=$5 WHERE id=$6`, [inputName, inputEmail, inputPhone, inputRole, inputIs_hired, id], (error, result) => {
			if (error) {
				reject(error);
			} else {
				resolve(result);
			}
		});
	});
};
const editDetailUser = (inputName, inputJobTitle, inputAddress, inputJobType, inpuDescription, inputWorkplace, id) => {
	return new Promise((resolve, reject) => {
		db.query(
			`UPDATE registeruser SET name= $1, job_title=$2, address=$3, job_type=$4, description=$5, workplace=$6 WHERE id=$7 RETURNING *`,
			[inputName, inputJobTitle, inputAddress, inputJobType, inpuDescription, inputWorkplace, id],
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

const deletedUser = (id) => {
	return new Promise((resolve, reject) => {
		db.query(`DELETE FROM registeruser WHERE id=$1`, [id], (error, result) => {
			if (error) {
				reject(error);
			} else {
				resolve(result);
			}
		});
	});
};

module.exports = {
	getAllUSer,
	findByEmail,
	addedUser,
	findbyID,
	editedPhoto,
	deletedUser,
	editedUser,
	editDetailUser,
};
