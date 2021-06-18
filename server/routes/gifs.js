const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
var crypto = require("crypto");

const auth = require("../middleware/auth.middleware");
const image = require("../utils/gifs.utils");
const { uploadFile } = require("../utils/s3.utils");
let Gif = require("../models/gif.model");

// Likes - array of users on gif model
// Fav -  array of gifs on user model

// Location and filename of gif
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, "tmp/");
	},
	filename: function (req, file, cb) {
		let id = crypto.randomBytes(4).toString("hex");
		cb(null, id + Date.now() + path.extname(file.originalname));
	},
});

// Max gif upload size
const maxSize = 20 * 1024 * 1024;
var upload = multer({ storage: storage, limits: { fileSize: maxSize } });

// List of newest gifs
router.get("/new", (req, res) => {
	// Option: specify catagoriy in json body

	// Pagination
	const limit = Number(req.query.limit) || 20;
	const skip = (Number(req.query.page) - 1) * limit || 0;

	options = {
		limit: limit,
		skip: skip,
		sort: { createdAt: -1 },
	};

	Gif.find(null, null, options)
		.then((gifs) => res.json(gifs))
		.catch((err) => res.status(400).json("Error: " + err));
});

// Get single gif
router.route("/:gifId").get((req, res) => {
	Gif.findById(req.params.gifId)
		.then((gifs) => res.json(gifs))
		.catch((err) =>
			res.status(400).json("Error: Could not get gifs from database")
		);
});

// List users gifs

// Create new gif
// TODO: Frefactor - Posibly place gif processing and upload on seperate process
router.post("/create", auth, upload.single("file"), async (req, res) => {
	// Get file and store in tmp

	const title = req.body.name;
	let preview = {};

	// Check on file (size, lenght)
	// TODO: size check, catch err, delete
	//let fileDetails =  await image.details(req.file)

	// Create small webp
	// TODO: catch err, delete
	await image
		.process(req.file)
		.then((data) => (preview = data))
		.catch((err) => res.status(400).json("Error: " + err)); // TODO: delete on err

	// Upload files to storage, delete tmp files
	let gifObject = {};
	let previewObject = {};
	await Promise.all([uploadFile(req.file), uploadFile(preview)])
		.then((data) => {
			gifObject = data[0];
			previewObject = data[1];
			Promise.all([fs.unlink(req.file.path), fs.unlink(preview.path)]).catch(
				(err) => console.log(err)
			);
		})
		.catch((err) => {
			// Delete local copy after upload
			Promise.all([fs.unlink(req.file.path), fs.unlink(preview.path)]).catch(
				(err) => console.log(err)
			);
			res.status(400).json("Error: " + err);
		});
	console.log(gifObject);
	// Write data to database and respond with new gif link
	let data = {
		title,
		gifUrl: gifObject.Location,
		previewUrl: previewObject.Location,
		author: req.user.sub,
	};

	const newGif = new Gif(data);
	newGif
		.save()
		.then((savedDoc) => {
			res.status(200).json(savedDoc);
		})
		.catch((err) => res.status(400).json("Error: " + err));
});
// Update gif details
// Delete gif(s)

module.exports = router;
