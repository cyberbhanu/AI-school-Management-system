const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter(req, file, cb) {
    const allowed = /pdf|jpg|jpeg|png/;
    if (!allowed.test(file.mimetype)) {
      cb(new Error("Only PDF & Images allowed"));
    }
    cb(null, true);
  }
});

module.exports = upload;
