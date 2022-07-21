const multer = require('multer')
const path = require('path')

// image storage
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './images')
  },
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    )
  }
})

const upload = multer({
  storage,
  limits: {
    fileSize: 1000000 // 1MB
  },
  fileFilter
})

function fileFilter (req, file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png/
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  // Check mime
  const mimetype = filetypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb('Error: Images Only!')
  }
}

module.exports = upload
