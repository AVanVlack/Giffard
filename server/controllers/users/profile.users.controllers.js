let User = require("../../models/user.model");

// Get Users Profile
const getProfile = (req, res, next) => {
	let id = "";
	if (req.user) {
		id = req.user.sub;
	} else {
		id = req.params.userId;
	}

	User.findById(id)
		.select("username name bio website image")
		.then((u) => {
			// Respond with new data/status 200
			console.log(u);
			res.status(200).json(u);
		})
		.catch(next);
};

module.exports = getProfile;
