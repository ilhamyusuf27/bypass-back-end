const model = require("../model/skillModel");

const getSkill = async (req, res) => {
  try {
    const getData = await model.getAllSkill();
    return res
      .status(200)
      .json({ skill: getData?.rows, jumlahData: getData?.rowCount });
  } catch (error) {
    console.log(error);
    res.status(400).send("ada yang error");
  }
};

const addSkill = async (req, res) => {
  try {
    const { id_user, skill } = req.body;
    if (!(id_user && skill)) {
      res.status(400).send("data tidak boleh kosong");
    } else {
      const fixskill = skill.trim();

      const postData = await model.addedSkill(id_user, fixskill);
      res.status(200).send("data berhasil di tambah");
    }
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

const deleteSkill = async (req, res) => {
  try {
    const { id } = req.body;

    const getData = await model.findbyID(id);
    if (getData?.rowCount) {
      //const { id } = req.body;
      const deleteData = await model.deletedSkill(id);
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
      res
        .status(200)
        .json({ user: getData?.rows, jumlahData: getData?.rowCount });
    } else {
      res.status(400).send("data tidak ditemukan");
    }
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

module.exports = {
  getSkill,
  addSkill,
  deleteSkill,
  findByIdUser,
};
