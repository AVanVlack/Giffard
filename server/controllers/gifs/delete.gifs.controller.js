let Gif = require("../../models/gif.model");
let s3 = require("../../utils/s3.utils");
// Delete gif - Auth by owner
const remove = (req, res, next) => {
	Gif.findById(req.params.gifId).then(async (doc) => {
		if (user.sub !== doc.author) {
			return res.sendStatus(401);
		}

		console.log("deleting gif");
		await s3.deleteFile(doc.gifUrl).then((data) => console.log(data));
		await s3.deleteFile(doc.previewUrl).then((data) => console.log(data));
		Gif.findByIdAndDelete(req.params.gifId)
			.then((g) => {
				res.sendStatus(200);
			})
			.catch(next);
	});
};

module.exports = remove;
