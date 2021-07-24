const getOptionalItems = require("../../utils/cleanData.utils");
let User = require("../../models/user.model");

// Updates non sensative parts of user data - Auth user only
// TODO: Verify unique username
const update = (req, res, next) => {
	// Make sanatized payload (username, email, bio, name, website, image)
	let payload = getOptionalItems(
		req.body,
		"username",
		"email",
		"bio",
		"name",
		"website",
		"image"
	);

	// Find by id and update using id from req.auth
	User.findByIdAndUpdate(req.user.sub, payload, {
		upsert: true,
		new: true,
	})
		.select("-hash -salt -saved")
		.then((u) => {
			// Respond with new data/status 200
			res.status(200).json(u);
		})
		.catch(next);
};

module.exports = update;
