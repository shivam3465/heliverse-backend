const errorHandler = (err, req, res, next) => {
	// Log the error for debugging purposes
	console.error("here is error: ",err);

	// Set the HTTP status code based on the error
	const statusCode = err.statusCode || 500;

	// Respond with the error message
	res.status(statusCode).json({
		success: false,
		error: err.message || "Internal Server Error",
	});
};

export { errorHandler };
