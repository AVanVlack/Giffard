let Gif = require("../../models/gif.model");
// Delete gif - Auth by owner
// FIXME: Remove gif from storage
// TODO: Author only
const remove = (req, res, next) => {
	Gif.findByIdAndDelete(req.params.gifId)
		.then((g) => {
			res.sendStatus(200);
		})
		.catch(next);
};

module.exports = remove;
