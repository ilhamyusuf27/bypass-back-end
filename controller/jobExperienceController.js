const model = require("../model/jobExperienceModel");

const getJobExperience = async (req, res) => {
  try {
    const getData = await model.getJobExperience();
    res
      .status(200)
      .json({ jobExperience: getData?.rows, jumlahData: getData?.rowCount });
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

const addJobExperience = async (req, res) => {
  try {
    const {
      id_user,
      job_title,
      company_name,
      start_date,
      end_date,
      description,
    } = req.body;
    if (
      !(
        id_user &&
        job_title &&
        company_name &&
        start_date &&
        end_date &&
        description
      )
    ) {
      res.status(400).send("data tidak boleh kosong");
    } else {
      const fixjob_title = job_title.trim();
      const fixcompany_name = company_name.trim();
      const fixdescription = description.trim();

      const postData = await model.addedJobExperience(
        id_user,
        fixjob_title,
        fixcompany_name,
        start_date,
        end_date,
        fixdescription
      );
      res.status(200).send("data berhasil di tambah");
    }
  } catch (error) {
    console.log("err", error);
    res.status(400).send("ada yang error");
  }
};

const deleteJobExperience = async (req, res) => {
  try {
    const { id } = req.body;

    const getData = await model.findbyID(id);
    if (getData?.rowCount) {
      //const { id } = req.body;
      const deleteData = await model.deletedJobExperience(id);
      res.send(`data id ke-${id} berhasil dihapus`);
    } else {
      res.status(400).send("data tidak ditemukan");
    }
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

module.exports = {
  getJobExperience,
  addJobExperience,
  deleteJobExperience,
};
