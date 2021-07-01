const fs = require("fs");
const path = require("path");
const { resolve } = require("path");
const gm = require("gm").subClass({ imageMagick: true });

let image = {};

// Remove data from original gif and create preview webp.
image.process = function (file) {
	webpName = path.basename(file.filename, ".gif") + ".webp";
	webpPath = path.join("tmp", webpName);
	return new Promise((resolve, reject) => {
		gm(path.resolve(file.path))
			.resize(300, 300)
			.compress("WEBP")
			.noProfile()
			.write(path.resolve(webpPath), (err) => {
				if (err) reject(err);
				else
					resolve({
						path: webpPath,
						filename: webpName,
					});
			});
	});
};

// Return size details about gif
image.details = function (file) {
	return new Promise((resolve, reject) => {
		gm(file.path).size((err, data) => {
			if (err) reject(err);
			else resolve(data);
		});
	});
};

module.exports = image;
