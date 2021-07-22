// Custom express error handler, returns json error
errorHandler = (err, req, res, next) => {
	let statusCode = err.statusCode || 400;
	if (
		process.env.NODE_ENV === "development" ||
		process.env.NODE_ENV === "test"
	) {
		console.log(err);
		return res.status(statusCode).json({
			error: {
				status: res.statusCode,
				message: err.message,
				stack: err.stack,
			},
		});
	} else {
		return res.status(statusCode).json({
			error: {
				status: res.statusCode,
				message: err.message,
			},
		});
	}
};

module.exports = errorHandler;
