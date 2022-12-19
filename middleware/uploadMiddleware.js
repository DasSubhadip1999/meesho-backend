const path = require("path");
const multer = require("multer");

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const VideoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "videos/");
  },
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({
  storage: Storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg") {
      cb(null, true);
    } else {
      console.log("Only jpg and png support");
      cb(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

const uploadVideo = multer({
  storage: VideoStorage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "video/mp4") {
      cb(null, true);
    } else {
      console.log("Only mp4 formal supported");
      cb(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 50,
  },
});

module.exports = {
  upload,
  uploadVideo,
};
