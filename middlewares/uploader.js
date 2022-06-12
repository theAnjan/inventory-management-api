const multer = require('multer');
const path = require('path');

// full control use disk storage

// multer way of file filetr upload hunu agi
// fileFilter will not block req-res cycle  it will skip file upload
function imageFilter(req, file, cb) {
  var mime_type = file.mimetype.split('/')[0];
  if (mime_type === 'image') {
    cb(null, true)
  } else {
    req.fileTypeErr = true;
    cb(null, false)
  }
}

function pdfFiler(req, file, cb) {
  // var mime_type = file.mimetype.split('/')[1];
  if (file.mimetype === 'application/pdf') {
    cb(null, true)
  } else {
    req.pdfTypeErr = true;
    cb(null, false)
  }
}

function jsonFilter(req, file, cb) {
  // var mime_type = file.mimetype.split('/')[1];
  if (file.mimetype === 'application/json') {
    cb(null, true)
  } else {
    req.jsonTypeErr = true;
    cb(null, false)
  }
}
function sizeFilter(req, file, cb) {
  // var mime_type = file.mimetype.split('/')[1];
  if (file.size >= 3000) {
    cb(null, true)
  } else {
    req.sizeTypeErr = true;
    cb(null, false)
  }
}



const myStorage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  },
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'uploads/images'))
  }
})

const upload = multer({
  storage: myStorage,
  fileFilter: imageFilter
})


module.exports = upload;