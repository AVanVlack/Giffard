const jwt = require("jsonwebtoken");
let User = require("../../models/user.model");

// Checks if and what user is logged in based on token
const current = async (req, res, next) => {
	if (req.cookies.jwt) {
		const token = req.cookies.jwt;
		let decode = null;
		try {
			decoded = jwt.verify(token, process.env.TOKEN_SECRET);
		} catch {
			next(new Error("Not Authroized"));
		}
		currentUser = await User.findById(decoded.sub).select("_id username image");
	} else {
		currentUser = null;
	}
	res.status(200).send({ currentUser });
};

module.exports = current;
