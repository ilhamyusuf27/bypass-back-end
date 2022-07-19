const model = require("../model/sosmedModel");

const getSosmed = async (req, res) => {
  try {
    const getData = await model.getAllSosmed();
    res
      .status(200)
      .json({ sosmed: getData?.rows, jumlahData: getData?.rowCount });
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
      const fixinstagram = instagram.trim();
      const fixgithub = github.trim();
      const fixgitlab = gitlab.trim();

      const postData = await model.addedSosmed(
        id_user,
        fixinstagram,
        fixgithub,
        fixgitlab
      );
      res.status(200).send("data berhasil di tambah");
    }
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

const deleteSosmed = async (req, res) => {
  try {
    const { id } = req.body;

    const getData = await model.findbyID(id);
    if (getData?.rowCount) {
      //const { id } = req.body;
      const deleteData = await model.deletedSosmed(id);
      res.send(`data id ke-${id} berhasil dihapus`);
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
};
