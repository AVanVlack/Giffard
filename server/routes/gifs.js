const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

// Controllers
const list = require("../controllers/gifs/list.gifs.controller");
const create = require("../controllers/gifs/create.gifs.controller");
const remove = require("../controllers/gifs/delete.gifs.controller");
const single = require("../controllers/gifs/single.gifs.controller");
const update = require("../controllers/gifs/update.gifs.controller");

// Gif Routes
router.get("/new", list);
router.get("/:gifId", single);
router.post("/create", auth, upload.single("file"), create);
router.post("/update/:gifId", auth, update);
router.delete("/delete/:gifId", auth, remove);

// Test error handler
router.get("/error", (req, res, next) => {
	next(new Error("BROKEN"));
});

// ----- To Impliment -----
// Like - Auth
// List users gifs - Auth by owner
// Likes - array of users on gif model
// Fav -  array of gifs on user model

module.exports = router;
