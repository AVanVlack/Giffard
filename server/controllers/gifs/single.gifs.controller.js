let Gif = require("../../models/gif.model");

// Get single gif
const single = (req, res, next) => {
	Gif.findById(req.params.gifId)
		.populate("author", "_id username image")
		.then((gifs) => res.json(gifs))
		.catch(next);
};

module.exports = single;
