const multer = require("multer");
const path = require("path");
const fss = require("fs");
var crypto = require("crypto");

// Location and filename of gif
const tmpPath = path.resolve("./tmp");

// Make sure tmp folder exists
if (!fss.existsSync(tmpPath)) {
	fss.mkdirSync(tmpPath);
}

// Max gif upload size
const maxSize = 20 * 1024 * 1024;

// Define how files are stored
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, tmpPath);
	},
	filename: function (req, file, cb) {
		let id = crypto.randomBytes(4).toString("hex");
		cb(null, id + Date.now() + path.extname(file.originalname));
	},
});

module.exports = multer({ storage: storage, limits: { fileSize: maxSize } });
