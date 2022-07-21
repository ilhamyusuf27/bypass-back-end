<<<<<<< HEAD
const multer = require('multer')
const multerUtils = require('../multer')

const uploadSingle = (req, res, next) => {
  const uploadSingle = multerUtils.single('recruiter_photo')
=======
const multer = require("multer");
const multerUtils = require("../multer");

const uploadSingle = (req, res, next) => {
  const uploadSingle = multerUtils.single("image");
>>>>>>> origin/dummy

  uploadSingle(req, res, (err) => {
    try {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
<<<<<<< HEAD
        res.status(400).send(err?.message ?? 'Something went wrong!')
        return
      } else if (err) {
        // An unknown error occurred when uploading.
        res.status(400).send(err ?? 'Something went wrong!')
        return
      }
      next()
    } catch (error) {
      res.status(500).send(error?.message ?? 'Upload Failed')
    }
  })
}

const uploadCompany = (req, res, next) => {
  const uploadSingle = multerUtils.single('recruiter_photo')
=======
        res.status(400).send(err?.message ?? "Something went wrong!");
        return;
      } else if (err) {
        // An unknown error occurred when uploading.
        res.status(400).send(err ?? "Something went wrong!");
        return;
      }

      next();
    } catch (error) {
      res.status(500).send(error?.message ?? "Upload Failed");
    }
  });
};

const uploadprofile = (req, res, next) => {
  const uploadSingle = multerUtils.single("profile");
>>>>>>> origin/dummy

  uploadSingle(req, res, (err) => {
    try {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading.
<<<<<<< HEAD
        res.status(400).send(err?.message ?? 'Something went wrong!')
        return
      } else if (err) {
        // An unknown error occurred when uploading.
        res.status(400).send(err ?? 'Something went wrong!')
        return
      }
      next()
    } catch (error) {
      res.status(500).send(error?.message ?? 'Error: Upload Failed!')
    }
  })
}

module.exports = {
  uploadSingle,
  uploadCompany
}
=======
        res.status(400).send(err?.message ?? "Something went wrong!");
        return;
      } else if (err) {
        // An unknown error occurred when uploading.
        res.status(400).send(err ?? "Something went wrong!");
        return;
      }
      next();
    } catch (error) {
      res.status(500).send(error?.message ?? "Upload Failed");
    }
  });
};

module.exports = {
  uploadSingle,
  uploadprofile,
};
>>>>>>> origin/dummy
