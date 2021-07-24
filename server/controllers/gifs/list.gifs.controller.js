let Gif = require("../../models/gif.model");

function fuzzySearch(text) {
	return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// List of newest gifs
const list = (req, res, next) => {
	// Pagination
	const limit = Number(req.query.limit) || 20;
	const skip = (Number(req.query.page) - 1) * limit || 0;

	// Query Option
	let query = {};
	if (req.query.user) query.author = req.query.user;
	if (req.query.categories) query.catagories = [req.query.categories];
	if (req.query.search)
		query.tags = new RegExp(fuzzySearch(req.query.search), "gi");

	options = {
		limit: limit,
		skip: skip,
		sort: { createdAt: -1 },
	};

	Gif.find(query, null, options)
		.then((gifs) => res.json(gifs))
		.catch(next);
};

module.exports = list;
