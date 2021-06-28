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
const friendlyUrl = process.env.BUCKET_URL;

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

// Make an object of posible items
const getCleanObject = (body, ...props) => {
	const newObject = {};

	const requestKeys = Object.keys(body);

	requestKeys.forEach((key) => {
		if (props.includes(key)) {
			newObject[key] = body[key];
		}
	});

	return newObject;
};

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

	let preview = {};
	console.log(req.body);

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
		...formData,
		gifUrl: friendlyUrl + gifObject.Key,
		previewUrl: friendlyUrl + previewObject.Key,
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

// Update gif details - Auth by owner
router.post("/update/:gifId", (req, res) => {
	let updateItems = getCleanObject(
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
router.delete("/delete/:gifId", (req, res) => {
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
