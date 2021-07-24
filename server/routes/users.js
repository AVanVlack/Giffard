const router = require("express").Router();
const auth = require("../middleware/auth.middleware");

// Controllers
const register = require("../controllers/users/create.users.controller");
const login = require("../controllers/users/login.users.controller");
const logout = require("../controllers/users/logout.users.controller");
const update = require("../controllers/users/update.users.controllers");
const profile = require("../controllers/users/profile.users.controllers");
const context = require("../controllers/users/current.users.controller");

// User Routes
router.get("/", context);
router.get("/logout", logout);
router.get("/profile/me", auth, profile);
router.get("/profile/:userId", profile);
router.post("/register", register);
router.post("/login", login);
router.post("/updateProfile", auth, update);

//----To Impliment-----
// Delete User
// Add Remove Favs
// Update sensative user data (email, password)

module.exports = router;
