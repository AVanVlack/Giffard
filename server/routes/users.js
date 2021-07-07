const router = require("express").Router();
const util = require("util");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.middleware");
const getOptionalItems = require("../utils/cleanData.utils");
let User = require("../models/user.model");

//TODO: Clean up, remove promisify, err handle, refactor repeats
// Get current users context
router.get("/", async (req, res) => {
	if (req.cookies.jwt) {
		const token = req.cookies.jwt;
		let decode = null;
		try {
			decoded = jwt.verify(token, process.env.TOKEN_SECRET);
		} catch {
			res.status(400);
		}
		currentUser = await User.findById(decoded.sub).select("_id username image");
	} else {
		currentUser = null;
	}
	res.status(200).send({ currentUser });
});

router.get("/protected", auth, (req, res) => {
	res
		.status(200)
		.json({ success: true, msg: "You are successfully authenticated!" });
});

// Register a new user
router.route("/register").post(async (req, res) => {
	const salt = await bcrypt.genSalt(10);
	const { username, password, email } = req.body;
	// FIXME: verify unique username
	// TODO: Send cookie and redirect
	const hash = await bcrypt.hash(req.body.password, salt);

	const newUser = new User({ username, hash, salt, email });

	newUser
		.save()
		.then(() => res.json("User added!"))
		.catch((err) => res.status(400).json("Error: " + err));
});
// TODO: Change login to auth route on server
// TODO: Refactor functions to util
// Login user
router.route("/login").post((req, res) => {
	User.findOne({ username: req.body.username })
		.then((user) => {
			if (!user) {
				return res
					.status(401)
					.json({ success: false, msg: "could not find user" });
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
					res.status(401).json("Wrong password");
				}
			}); // FIXME: catch bcrypt errors
		})
		.catch((err) => {
			return res.status(400).json("Error: " + err);
		});
});

router.route("/logout").get((req, res) => {
	res.cookie("jwt", "", {
		expires: new Date(0),
		httpOnly: true,
		//secure: req.secure || req.headers["x-forwarded-proto"] === "https",
		//sameSite: "none",
	});
	res.sendStatus(200);
});

// Updates non sensative parts of user data - Auth user only
router.post("/updateProfile", auth, (req, res) => {
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
		.catch((err) => res.status(400).json("Error: Could not update user"));
});

// Update sensative user data (email, password)

// Get Users Profile
const getProfile = (req, res) => {
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
		.catch((err) => res.status(400).json("Error: Could not find user"));
};

router.get("/profile/me", auth, getProfile);
router.get("/profile/:userId", getProfile);

// Delete User
// Add Remove Favs

module.exports = router;
