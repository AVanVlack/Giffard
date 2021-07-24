const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let User = require("../../models/user.model");

// Login user
// TODO: Change login to auth route on server
// TODO: Refactor functions to util
const login = (req, res, next) => {
	User.findOne({ username: req.body.username })
		.then((user) => {
			if (!user) {
				res.status(401);
				next(new Error("could not find user"));
			}

			bcrypt.compare(req.body.password, user.hash).then((isValid) => {
				if (isValid) {
					// Issue json web token
					const _id = user._id;
					const expiresIn = "7d";

					const payload = {
						sub: _id,
						iat: Date.now(),
					};

					const signedToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
						expiresIn: expiresIn,
					});

					let d = new Date();
					d.setDate(d.getDate() + 7);

					res.cookie("jwt", signedToken, {
						expires: d,
						httpOnly: true,
						//secure: req.secure || req.headers["x-forwarded-proto"] === "https",
						//sameSite: "none",
					});

					res.status(200).json({ token: signedToken });
				} else {
					res.status(401);
					next(new Error("Wrong Password"));
				}
			}); // FIXME: catch bcrypt errors
		})
		.catch(next);
};

module.exports = login;
