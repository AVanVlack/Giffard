const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.middleware");
let User = require("../models/user.model");

//TODO: Clean up, remove promisify, err handle, refactor repeats
// Get current users context
router.route("/").get(async (req, res) => {
	if (req.cookies.jwt) {
		const token = req.cookies.jwt;
		const decoded = await promisify(jwt.verify)(
			token,
			process.env.TOKEN_SECRET
		);
		currentUser = await User.findById(decoded.sub).populate(
			"_id",
			"username",
			"image",
			"-password"
		);
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

// Update the users profile. Auth = user only
router.route("/updateProfile").post(async (req, res) => {
	const hashedPassword = await bcrypt.hash(req.body.password);
	const username = req.body.username;
	const password = hashedPassword;
	const email = req.body.email;

	const newUser = new User({ username, password, email });

	newUser
		.save()
		.then(() => res.json("User added!"))
		.catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
