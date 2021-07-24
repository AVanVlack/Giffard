const fs = require("fs/promises");
const image = require("../../utils/gifs.utils");
const { uploadFile } = require("../../utils/s3.utils");
let Gif = require("../../models/gif.model");

// Create new gif - Auth
// TODO: Add ref to authoring user
// TODO: Refactor - Posibly place gif processing and upload on seperate process
// FIXME: Zombie cloud file if database rejects create. Check for required feilds before upload
const create = async (req, res, next) => {
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
			]).catch(next);
		})
		.catch((err) => {
			// Delete local copy after upload
			Promise.all([
				fs.unlink(fileSet.gif.path),
				fs.unlink(fileSet.webpPreview.path),
				fs.unlink(fileSet.gifPreview.path),
			]).catch(next);
			next(new Error("Could not upload files"));
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
		.catch(next);
};

module.exports = create;
