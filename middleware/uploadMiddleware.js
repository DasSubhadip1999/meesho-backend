const path = require("path");
const multer = require("multer");

const Storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    console.log("multer", file);
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
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      cb(new Error("Only JPG and PNG supported"));
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
      cb(null, false);
      cb(null, new Error("Only mp4 format supported"));
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
