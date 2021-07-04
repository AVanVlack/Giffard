const fs = require("fs");
const path = require("path");
const { resolve } = require("path");
const { execFile } = require("child_process");
const gifsicle = require("gifsicle");
const gif2webp = require("gif2webp-bin");

let image = {};

makeWebp = (fileIn, fileOut) => {
	return new Promise((resolve, reject) => {
		execFile(gif2webp, [fileIn.path, "-o", fileOut.path], (err, stdout) => {
			if (err) reject(new Error(`Webp error: ${err}`));
			resolve(stdout);
		});
	});
};

resizeGif = (fileIn, fileOut) => {
	console.log(fileIn.path);
	return new Promise((resolve, reject) => {
		execFile(
			gifsicle,
			["--resize-fit-width", "300", "-o", fileOut.path, fileIn.path],
			(err, stdout) => {
				if (err) reject(new Error(`Gifsicle error: ${err}`));
				resolve(stdout);
			}
		);
	});
};

// Create a preview webp and gif.
image.process = function (InputFile) {
	webpPreviewName = path.basename(InputFile.filename, ".gif") + "_300.webp";
	webpPreview = {
		filename: webpPreviewName,
		path: path.resolve(path.join("tmp", webpPreviewName)),
	};
	gifPreviewName = path.basename(InputFile.filename, ".gif") + "_300.gif";
	gifPreview = {
		filename: gifPreviewName,
		path: path.resolve(path.join("tmp", gifPreviewName)),
	};

	return new Promise((resolve, reject) => {
		(async () => {
			await resizeGif(InputFile, gifPreview);
			await makeWebp(gifPreview, webpPreview);
			resolve(webpPreview);
		})();
	});
};

module.exports = image;
