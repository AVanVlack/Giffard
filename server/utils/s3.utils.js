let AWS = require("aws-sdk");
let fs = require("fs");

const accessKeyId = process.env.S3_ID;
const secretAccessKey = process.env.S3_SECRET;
const Bucket = process.env.BUCKET_ID;
const region = process.env.S3_REGION;

var ep = new AWS.Endpoint(process.env.S3_URL);

const s3 = new AWS.S3({ accessKeyId, secretAccessKey, region, endpoint: ep });

// Upload a file
exports.uploadFile = function (file) {
	console.log(file);
	const fileStream = fs.createReadStream(file.path);

	const uploadParams = {
		Bucket,
		Body: fileStream,
		Key: file.filename,
	};
	return s3.upload(uploadParams).promise();
};

// Delete a file
