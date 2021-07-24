const bcrypt = require("bcrypt");
let User = require("../../models/user.model");

// Register a new user
// TODO: bcrypt Password on mongoose presave
const register = async (req, res, next) => {
	const salt = await bcrypt.genSalt(10);
	const { username, password, email } = req.body;
	// FIXME: verify unique username
	// TODO: Send cookie and redirect
	const hash = await bcrypt.hash(req.body.password, salt);

	const newUser = new User({ username, hash, salt, email });

	newUser
		.save()
		.then(() => res.json("User added!"))
		.catch(next);
};

module.exports = register;
