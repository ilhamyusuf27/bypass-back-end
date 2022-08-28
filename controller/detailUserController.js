const model = require("../model/detailUserModel");
const modelSkill = require("../model/skillModel");

const getDetailUsers = async (req, res) => {
	try {
		const getData = await model.getDetailUSer();
		res.status(200).json({ detailUser: getData?.rows, jumlahData: getData?.rowCount });
	} catch (error) {
		res.status(400).send("ada yang error");
	}
};

const addDetailUsers = async (req, res) => {
	try {
		const { id_user, job_title, address, job_type, description, tempat_kerja } = req.body;

		const getData = await model.findbyIdUser(id_user);

		if (getData.rowCount) {
			res.status(400).send("id_user telah terdaftar");
		} else {
			const fixjob_title = job_title.trim() || null;
			const fixaddress = address.trim() || null;
			const fixjob_type = job_type.trim() || null;
			const fixdescription = description.trim() || null;
			const fixtempat_kerja = tempat_kerja.trim() || null;

			const postData = await model.addedDetailUsers(id_user, fixjob_title, fixaddress, fixjob_type, fixdescription, fixtempat_kerja);
			res.status(200).send({
				msg: "data berhasil di tambah",
				data: {
					id_user,
					fixjob_title,
					fixaddress,
					fixjob_type,
					fixdescription,
				},
			});
		}
	} catch (error) {
		res.status(400).send("ada yang error");
	}
};

const getAllData = async (req, res) => {
	try {
		const getData = await model.getAllDataUser();
		res.status(200).json({
			allData: getData?.rows.map((e) => {
				return { ...e, password: null };
			}),
			jumlahData: getData?.rowCount,
		});
	} catch (error) {
		console.log("err", error);
		res.status(400).send("ada yang error");
	}
};

const findByIdUser = async (req, res) => {
	//cari berdasarkan name
	try {
		const { id_user } = req.query;
		const getData = await model.findbyIdUser(id_user);
		if (getData?.rowCount) {
			res.status(200).json({ user: getData?.rows, jumlahData: getData?.rowCount });
		} else {
			res.status(400).send("data tidak ditemukan");
		}
	} catch (error) {
		res.status(400).send("ada yang error");
	}
};

const getAlldataIdUser = async (req, res) => {
	try {
		const { id } = req.query;
		const getData = await model.getDataByID(id);
		res.status(200).json({
			allData: getData?.rows.map((e) => {
				return { ...e, password: null };
			}),
			jumlahData: getData?.rowCount,
		});
	} catch (error) {
		console.log("err", error);
		res.status(400).send("ada yang error");
	}
};

const getAllProfile = async (req, res) => {
	try {
		const getData = await model.getAllDataUser();
		const profile = await Promise.all(
			getData.rows.map(async (e) => {
				const data = await modelSkill.findbyIdUser(e.id);
				return { ...e, skill: data.rows };
			})
		);
		res.send({ profile });
	} catch (error) {
		console.log("err", error);
		res.status(400).send("ada yang error");
	}
};

const getProfileByName = async (req, res) => {
	try {
		const { name } = req.query;
		const getData = await model.getDataByName(name);
		console.log(getData);
		if (getData?.rowCount) {
			const profile = await Promise.all(
				getData.rows.map(async (e) => {
					console.log(e.id);
					const data = await modelSkill.findbyIdUser(e.id);
					return { ...e, skill: data.rows };
				})
			);
			res.send({ profile });
		} else {
			res.status(400).send("data tidak ditemukan");
		}
	} catch (error) {
		console.log("err", error);
		res.status(400).send("ada yang error");
	}
};

const getProfileByAddress = async (req, res) => {
	try {
		const { address } = req.query;
		const getData = await model.getDataByAddress(address);
		if (getData?.rowCount) {
			const profile = await Promise.all(
				getData.rows.map(async (e) => {
					const data = await modelSkill.findbyIdUser(e.id);
					return { ...e, skill: data.rows };
				})
			);
			res.send({ profile });
		} else {
			res.status(400).send("data tidak ditemukan");
		}
	} catch (error) {
		console.log("err", error);
		res.status(400).send("ada yang error");
	}
};

const getProfileFulltime = async (req, res) => {
	try {
		const getData = await model.getDataByJob_type("fulltime");
		if (getData?.rowCount) {
			const profile = await Promise.all(
				getData.rows.map(async (e) => {
					const data = await modelSkill.findbyIdUser(e.id);
					return { ...e, skill: data.rows };
				})
			);
			res.send({ profile });
		} else {
			res.status(400).send("data tidak ditemukan");
		}
	} catch (error) {
		console.log("err", error);
		res.status(400).send("ada yang error");
	}
};

const getProfileFreelance = async (req, res) => {
	try {
		const getData = await model.getDataByJob_type("freelance");
		if (getData?.rowCount) {
			const profile = await Promise.all(
				getData.rows.map(async (e) => {
					const data = await modelSkill.findbyIdUser(e.id);
					return { ...e, skill: data.rows };
				})
			);
			res.send({ profile });
		} else {
			res.status(400).send("data tidak ditemukan");
		}
	} catch (error) {
		console.log("err", error);
		res.status(400).send("ada yang error");
	}
};

const updateDetailUser = async (req, res) => {
	try {
		const { id_user, job_title, address, job_type, description, tempat_kerja } = req.body;
		const getData = await model.findbyIdUser(id_user);
		if (getData?.rowCount) {
			let changeJobTitle = job_title || getData.rows[0].job_title;
			let changeAddress = address || getData.rows[0].address;
			let changeJob_type = job_type || getData.rows[0].job_type;
			let changeDescription = description || getData.rows[0].description;
			let changeTempatKerja = tempat_kerja || getData.rows[0].tempat_kerja;

			await model.updateDetailUser({
				id_user,
				changeJobTitle,
				changeAddress,
				changeJob_type,
				changeDescription,
				changeTempatKerja,
			});
			res.send({
				msg: `Detail data dengan user id ${id_user} telah diperbarui!`,
				data: {
					id_user,
					job_title: changeJobTitle,
					address: changeAddress,
					job_type: changeJob_type,
					description: description,
				},
			});
		} else {
			res.status(400).send("data tidak ditemukan");
		}
	} catch (error) {
		console.log("err", error);
		res.status(400).send("ada yang error");
	}
};

const getProfileBySkill = async (req, res) => {
	try {
		const { skill } = req.query;
		const getData = await model.getDataSkill(skill);
		if (getData?.rowCount) {
			const profile = await Promise.all(
				getData.rows.map(async (e) => {
					const data = await modelSkill.findbyIdUser(e.id_user);
					return { ...e, Skill: data.rows };
				})
			);
			res.send({ profile });
		} else {
			res.status(400).send("data tidak ditemukan");
		}
	} catch (error) {
		console.log("err", error);
		res.status(400).send("ada yang error");
	}
};

const deleteDetail = async (req, res) => {
	try {
		const { id } = req.query;

		const getData = await model.findbyID(id);
		console.log(getData);
		if (getData?.rowCount) {
			//const { id } = req.body;
			const deleteData = await model.deletedDetail(id);
			res.send(`data id ke-${id} berhasil dihapus`);
		} else {
			res.status(400).send("data tidak ditemukan");
		}
	} catch (error) {
		console.log(error);
		res.status(400).send("ada yang error");
	}
};

const getProfileByJobtitle = async (req, res) => {
	try {
		const { job_title } = req.query;
		const getData = await model.getDataByJobtitle(job_title);
		if (getData?.rowCount) {
			const profile = await Promise.all(
				getData.rows.map(async (e) => {
					const data = await modelSkill.findbyIdUser(e.id);
					return { ...e, skill: data.rows };
				})
			);
			res.send({ profile });
		} else {
			res.status(400).send("data tidak ditemukan");
		}
	} catch (error) {
		console.log("err", error);
		res.status(400).send("ada yang error");
	}
};

module.exports = {
	getDetailUsers,
	addDetailUsers,
	getAllData,
	findByIdUser,
	getAllProfile,
	getAlldataIdUser,
	getProfileByName,
	getProfileByAddress,
	getProfileFulltime,
	getProfileFreelance,
	updateDetailUser,
	getProfileBySkill,
	deleteDetail,
	getProfileByJobtitle,
};
