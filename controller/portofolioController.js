const model = require("../model/portofolioModel");
require("dotenv").config();

const getPortofolio = async (req, res) => {
  try {
    const getData = await model.getAllPortofolio();
    res.status(200).json({
      portofolio: getData?.rows,
      jumlahData: getData?.rowCount,
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).send("ada yang error");
  }
};

const addPortofolio = async (req, res) => {
  try {
    if (req?.file) {
      const image = `${process.env.URL_API}/images/${req.file.filename}`;
      const { id_user, aplication_title, link_repository, portofolio_type } =
        req.body;
      if (
        !(id_user && aplication_title && link_repository && portofolio_type)
      ) {
        res.status(400).send("data tidak boleh kosong");
      } else {
        const fixaplication_title = aplication_title.trim();
        const fixlink_repository = link_repository.trim();
        const fixportofolio_type = portofolio_type.trim();

        const postData = await model.addedPortofolio(
          id_user,
          fixaplication_title,
          fixlink_repository,
          fixportofolio_type,
          image
        );
        res.status(200).send("data berhasil di tambah");
      }
    } else {
      res.status(401).send("silahkan pilih file yang akan diupload");
    }
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

const deletePortofolio = async (req, res) => {
  try {
    const { id } = req.body;

    const getData = await model.findbyID(id);
    if (getData?.rowCount) {
      //const { id } = req.body;
      const deleteData = await model.deletedPortofolio(id);
      res.send(`data id ke-${id} berhasil dihapus`);
    } else {
      res.status(400).send("data tidak ditemukan");
    }
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

module.exports = {
  getPortofolio,
  addPortofolio,
  deletePortofolio,
};