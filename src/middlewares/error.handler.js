const { ValidationError } = require("sequelize");

const debug = require("debug")("my-store:middleware-error");

function logErrors(err, req, res, next) {
	debug("logError");
	//   console.log(err);
	next(err);
}

function errorHandler(err, req, res, next) {
	debug("errorHandler");
	res.status(500).json({
		message: err.message,
		stack: err.stack,
	});
}

function booErrorHandler(err, req, res, next) {
	if (err.isBoom) {
		const { output } = err;
		res.status(output.statusCode).json(output.payload);
	} else {
		next(err);
	}
}

function ormErrorHandler(err, req, res, next) {
	if (err instanceof ValidationError) {
		res.status(409).json({
			statusCode: 409,
			message: err.name,
			errors: err.errors,
		});
	}
	next(err);
}

module.exports = {
	logErrors,
	errorHandler,
	booErrorHandler,
	ormErrorHandler,
};
