const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const fss = require("fs");
let getOptionalItems = require("../utils/cleanData.utils");
var crypto = require("crypto");

const auth = require("../middleware/auth.middleware");
const image = require("../utils/gifs.utils");
const { uploadFile } = require("../utils/s3.utils");
let Gif = require("../models/gif.model");

// Likes - array of users on gif model
// Fav -  array of gifs on user model

// Location and filename of gif
const tmpPath = path.resolve("./tmp");

// Make sure tmp folder exists
if (!fss.existsSync(tmpPath)) {
	fss.mkdirSync(tmpPath);
}

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, tmpPath);
	},
	filename: function (req, file, cb) {
		let id = crypto.randomBytes(4).toString("hex");
		cb(null, id + Date.now() + path.extname(file.originalname));
	},
});

// Max gif upload size
const maxSize = 20 * 1024 * 1024;
var upload = multer({ storage: storage, limits: { fileSize: maxSize } });

function escapeRegex(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// List of newest gifs
router.get("/new", (req, res) => {
	// Pagination
	const limit = Number(req.query.limit) || 20;
	const skip = (Number(req.query.page) - 1) * limit || 0;

	// Query Option
	let query = {};
	if (req.query.user) query.author = req.query.user;
	if (req.query.categories) query.catagories = [req.query.categories];
	if (req.query.search)
		query.tags = new RegExp(escapeRegex(req.query.search), "gi");

	options = {
		limit: limit,
		skip: skip,
		sort: { createdAt: -1 },
	};

	Gif.find(query, null, options)
		.then((gifs) => res.json(gifs))
		.catch((err) => res.status(400).json("Error: " + err));
});

// Get single gif
router.route("/:gifId").get((req, res) => {
	Gif.findById(req.params.gifId)
		.populate("author", "_id username image")
		.then((gifs) => res.json(gifs))
		.catch((err) =>
			res.status(400).json("Error: Could not get gifs from database")
		);
});

// Create new gif - Auth
// TODO: Add ref to authoring user
// TODO: Refactor - Posibly place gif processing and upload on seperate process
// FIXME: Zombie cloud file if database rejects create. Check for required feilds before upload
router.post("/create", auth, upload.single("file"), async (req, res) => {
	// Get file and store in tmp
	const formData = {
		title: req.body.title,
		description: req.body.description,
		tags: req.body.tags.split(","),
		catagories: [req.body.catagories],
	};

	// Check on file (size, lenght)
	// TODO: size check, catch err, delete
	//let fileDetails =  await image.details(req.file)

	// Create small webp
	// TODO: catch err, delete
	let fileSet = {};
	await image.process(req.file).then((data) => (fileSet = data));

	// Upload files to storage, delete tmp files
	let gifObject = {};
	let previewObject = {};
	console.log(fileSet);

	await Promise.all([uploadFile(fileSet.gif), uploadFile(fileSet.webpPreview)])
		.then((data) => {
			gifObject = data[0];
			previewObject = data[1];
			Promise.all([
				fs.unlink(fileSet.gif.path),
				fs.unlink(fileSet.webpPreview.path),
				fs.unlink(fileSet.gifPreview.path),
			]).catch((err) => console.log(err));
		})
		.catch((err) => {
			// Delete local copy after upload
			Promise.all([
				fs.unlink(fileSet.gif.path),
				fs.unlink(fileSet.webpPreview.path),
				fs.unlink(fileSet.gifPreview.path),
			]).catch((err) => console.log(err));
			return res.status(400).json("Error: " + err);
		});
	console.log(gifObject);
	// Write data to database and respond with new gif link
	let data = {
		...formData,
		gifUrl: gifObject.Key,
		previewUrl: previewObject.Key,
		author: req.user.sub,
	};

	const newGif = new Gif(data);
	newGif
		.save()
		.then((savedDoc) => {
			res.status(200).json(savedDoc);
		})
		.catch((err) => {
			return res.status(400).json("Error: " + err);
		});
});

// Update gif details - Auth by owner
// TODO: Author only
router.post("/update/:gifId", auth, (req, res) => {
	let updateItems = getOptionalItems(
		req.body,
		"title",
		"tags",
		"description",
		"catagories"
	);

	Gif.findByIdAndUpdate(req.params.gifId, updateItems, {
		upsert: true,
		new: true,
	})
		.then((doc) => doc.populate("author", "_id username image").execPopulate())
		.then((g) => {
			res.status(200).json(g);
		})
		.catch((err) => res.status(400).json("Error: Could not update gif"));
});

// Delete gif - Auth by owner
// FIXME: Remove gif from storage
// TODO: Author only
router.delete("/delete/:gifId", auth, (req, res) => {
	Gif.findByIdAndDelete(req.params.gifId)
		.then((g) => {
			res.sendStatus(200);
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json("Error: Could not delete gif");
		});
});

// Like - Auth
// List users gifs - Auth by owner

module.exports = router;
