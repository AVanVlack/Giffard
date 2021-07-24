let getOptionalItems = require("../../utils/cleanData.utils");
let Gif = require("../../models/gif.model");

// Update gif details - Auth by owner
// TODO: Author only
const update = (req, res, next) => {
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
		.catch(next);
};

module.exports = update;
