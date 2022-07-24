const cloudinary = require("../middleware/cloudinary");
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
    const { id_user, aplication_title, link_repository, portofolio_type } =
      req.body;
    if (!(id_user && aplication_title && link_repository && portofolio_type)) {
      res.status(400).send("data tidak boleh kosong");
    } else {
      const { id_user, aplication_title, link_repository, portofolio_type } =
        req.body;
      if (req?.file) {
        const uploadImage = await cloudinary.uploader.upload(req.file.path, {
          folder: "portofolio",
        });
        const image = uploadImage.secure_url;
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
      } else {
        res.status(401).send("silahkan pilih file yang akan diupload");
      }
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
  getPortofolio,
  addPortofolio,
  deletePortofolio,
  findByIdUser,
};
