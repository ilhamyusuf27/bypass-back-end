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

const addedDetailUsers = (id_user, fixjob_title, fixaddress, fixjob_type, fixdescription, fixtempat_kerja) => {
	return new Promise((resolve, reject) => {
		db.query(
			`INSERT INTO detailuser (id_user, job_title, address, job_type, description, tempat_kerja) 
    VALUES ($1,$2,$3,$4,$5,$6)`,
			[id_user, fixjob_title, fixaddress, fixjob_type, fixdescription, fixtempat_kerja],
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
		db.query(`SELECT * FROM detailuser FULL OUTER JOIN registeruser ON detailuser.id_user = registeruser.id ORDER BY registeruser.id DESC`, (error, result) => {
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
		db.query(`SELECT * FROM detailuser WHERE id_user=$1`, [id_user], (error, result) => {
			if (error) {
				reject(error);
			} else {
				resolve(result);
			}
		});
	});
};

const getDataByID = (id) => {
	return new Promise((resolve, reject) => {
		db.query(`SELECT * FROM detailuser FULL OUTER JOIN registeruser ON detailuser.id_user = registeruser.id WHERE registeruser.id =$1`, [id], (error, result) => {
			if (error) {
				reject(error);
			} else {
				resolve(result);
			}
		});
	});
};

const getDataByName = (name) => {
	return new Promise((resolve, reject) => {
		db.query(`SELECT * FROM detailuser FULL OUTER JOIN registeruser ON detailuser.id_user = registeruser.id WHERE registeruser.name ~* $1`, [name], (error, result) => {
			if (error) {
				reject(error);
			} else {
				resolve(result);
			}
		});
	});
};

const getDataByAddress = (address) => {
	return new Promise((resolve, reject) => {
		db.query(`SELECT * FROM detailuser FULL OUTER JOIN registeruser ON detailuser.id_user = registeruser.id WHERE detailuser.address ~* $1`, [address], (error, result) => {
			if (error) {
				reject(error);
			} else {
				resolve(result);
			}
		});
	});
};

const getDataByJob_type = (job_type) => {
	return new Promise((resolve, reject) => {
		db.query(`SELECT * FROM detailuser FULL OUTER JOIN registeruser ON detailuser.id_user = registeruser.id WHERE detailuser.job_type ~* $1`, [job_type], (error, result) => {
			if (error) {
				reject(error);
			} else {
				resolve(result);
			}
		});
	});
};

const updateDetailUser = (props) => {
	const { id_user, changeJobTitle, changeAddress, changeJob_type, changeDescription, changeTempatKerja } = props;
	return new Promise((resolve, reject) => {
		db.query(
			`UPDATE detailuser SET job_title = $1, address = $2, job_type= $3, description = $4, tempat_kerja= $5 WHERE id_user = $6`,
			[changeJobTitle, changeAddress, changeJob_type, changeDescription, changeTempatKerja, id_user],
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

const getDataSkill = (skill) => {
	return new Promise((resolve, reject) => {
		db.query(
			`SELECT * FROM skill FULL OUTER JOIN registeruser ON skill.id_user = registeruser.id INNER JOIN detailuser ON detailuser.id_user = registeruser.id WHERE skill ~* $1`,
			[skill],
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

const deletedDetail = (id) => {
	return new Promise((resolve, reject) => {
		db.query(`DELETE FROM detailuser WHERE id=$1`, [id], (error, result) => {
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
		db.query(`SELECT * FROM detailuser WHERE id=$1`, [id], (error, result) => {
			if (error) {
				reject(error);
			} else {
				resolve(result);
			}
		});
	});
};

const getDataByJobtitle = (job_title) => {
	return new Promise((resolve, reject) => {
		db.query(`SELECT * from registeruser WHERE job_title ~* $1`, [job_title], (error, result) => {
			if (error) {
				reject(error);
			} else {
				resolve(result);
			}
		});
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
	updateDetailUser,
	getDataSkill,
	deletedDetail,
	findbyID,
	getDataByJobtitle,
};
