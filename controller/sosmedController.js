const model = require("../model/sosmedModel");

const getSosmed = async (req, res) => {
	try {
		const getData = await model.getAllSosmed();
		res.status(200).json({ sosmed: getData?.rows, jumlahData: getData?.rowCount });
	} catch (error) {
		res.status(400).send("ada yang error");
	}
};

const addSosmed = async (req, res) => {
	try {
		const { id_user, instagram, github, gitlab } = req.body;
		if (!(id_user && instagram && github && gitlab)) {
			res.status(400).send("data tidak boleh kosong");
		} else {
			const checkSosmed = await model.findbyIdUser(id_user);
			if (checkSosmed.rowCount > 0) {
				res.status(400).send(`UserId-${id_user} sudah ada sosmed`);
			} else {
				const fixinstagram = instagram.trim();
				const fixgithub = github.trim();
				const fixgitlab = gitlab.trim();

				const postData = await model.addedSosmed(id_user, fixinstagram, fixgithub, fixgitlab);
				res.status(200).send("data berhasil di tambah");
			}
		}
	} catch (error) {
		res.status(400).send("ada yang error");
	}
};

const deleteSosmed = async (req, res) => {
	try {
		const { id } = req.query;

		const getData = await model.findbyID(id);
		if (getData?.rowCount) {
			await model.deletedSosmed(id);
			res.send(`data id ke-${id} berhasil dihapus`);
		} else {
			res.status(400).send("data tidak ditemukan");
		}
	} catch (error) {
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

const updateUserSosmed = async (req, res) => {
	try {
		const { id_user, instagram, github, gitlab } = req.body;
		const getData = await model.findbyIdUser(id_user);
		if (getData?.rowCount) {
			let changeInstagram = instagram || getData.rows[0].instagram;
			let changeGithub = github || getData.rows[0].github;
			let changeGitlab = gitlab || getData.rows[0].gitlab;

			await model.updateSosmed({ id_user, changeInstagram, changeGithub, changeGitlab });
			res.status(200).json({
				msg: `Sosial Medi userid-${id_user} berhasil diperbarui`,
				data_change: {
					id_user,
					instagram: changeInstagram,
					github: changeGithub,
					gitlab: changeGitlab,
				},
			});
		} else {
			res.status(400).send("data tidak ditemukan");
		}
	} catch (error) {
		res.status(400).send("ada yang error");
	}
};

module.exports = {
	getSosmed,
	addSosmed,
	deleteSosmed,
	findByIdUser,
	updateUserSosmed,
};
