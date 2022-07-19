const model = require("../model/detailUserModel");

const getDetailUsers = async (req, res) => {
  try {
    const getData = await model.getDetailUSer();
    res
      .status(200)
      .json({ detailUser: getData?.rows, jumlahData: getData?.rowCount });
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

const addDetailUsers = async (req, res) => {
  try {
    const { id_user, job_title, address, job_type, description } = req.body;
    if (!(id_user && job_title && address && job_type && description)) {
      res.status(400).send("data tidak boleh kosong");
    } else {
      const fixjob_title = job_title.trim();
      const fixaddress = address.trim();
      const fixjob_type = job_type.trim();
      const fixdescription = description.trim();

      const postData = await model.addedDetailUsers(
        id_user,
        fixjob_title,
        fixaddress,
        fixjob_type,
        fixdescription
      );
      res.status(200).send("data berhasil di tambah");
    }
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};
module.exports = {
  getDetailUsers,
  addDetailUsers,
};
