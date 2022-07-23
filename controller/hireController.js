const model = require("../model/hireModel");

const getAllHire = async (req, res) => {
    try {
      const getData = await model.getAllHire();
  
      res.send({ data: getData.rows, jumlahData: getData.rowCount });
    } catch (error) {
      console.log("error", error);
      res.status(400).send("Something's wrong");
    }
};

const getHireById = async (req, res) => {
    try {
      const { hire_id } = req.query;
      const getData = await model.getHireById(hire_id);
  
      if (getData.rowCount > 0) {
        if (parseInt(hire_id)) {
          res.send({ data: getData.rows, jumlahData: getData.rowCount });
        } else {
          res.status(400).send("Invalid number!");
        }
      } else {
        res.status(400).send("Hire id not found!");
      }
    } catch (error) {
      console.log("error", error);
      res.status(400).send("Something's wrong");
    }
};

const addHire = async (req, res) => {
    try {
      const { hire_message, hire_name, hire_email, hire_phone, hire_description, id, recruiter_id } = req.body
      
      const data = await model.addHire({ hire_message, hire_name, hire_email, hire_phone, hire_description, id, recruiter_id })
        res.status(200).send({message: 'berhasil hire', data : {
          hire_message, hire_name, hire_email,hire_phone,hire_description, id, recruiter_id
        }})    
    } catch (error) {
      console.log('error', error)
      res.status(400).send("Something's wrong")
    }
}

module.exports = {
    getAllHire,
    getHireById,
    addHire
}