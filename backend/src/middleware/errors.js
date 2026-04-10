function notFound(req, res, next) {
	res.status(404).json({ error: "Not found" });
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
	const status = Number(err.status || 500);
	res.status(status).json({
		error: err.message || "Server error"
	});
}

module.exports = { notFound, errorHandler };

