const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookies = require("cookie-parser");
const path = require("path");
require("dotenv").config();

const userRouter = require("./routes/users");
const gifRouter = require("./routes/gifs");

const app = express();
const dbUri = process.env.DB_URI;
const port = process.env.PORT || 5000;
const environment = process.env.NODE_ENV;

// Database Setup
mongoose.connect(dbUri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
	console.log("Connected to MongoDB Database");
});

var corsOptions = {
	origin: "http://localhost:5000",
	credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookies());
app.use(morgan("dev")); // TODO: set logging mode with env

app.use("/api/users", userRouter);
app.use("/api/gifs", gifRouter);

if (environment !== "development") {
	app.use(express.static(path.join(__dirname, "../client/build")));
	app.get("/*", (req, res) => {
		res.sendFile(path.join(__dirname, "../client/build", "index.html"));
	});
}

// Start Server
app.listen(port, () => {
	console.log(`Server is running at: http://localhost:${port}`);
});
