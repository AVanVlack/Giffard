const logout = (req, res) => {
	res.cookie("jwt", "", {
		expires: new Date(0),
		httpOnly: true,
		//secure: req.secure || req.headers["x-forwarded-proto"] === "https",
		//sameSite: "none",
	});
	res.sendStatus(200);
};

module.exports = logout;
