const boom = require("@hapi/boom");

function validatorHandler(schema, property) {
	return (req, res, next) => {
		const data = req[property];
		// property puede ser body, params o query

		const { error } = schema.validate(data);
		if (error) {
			next(boom.badRequest(error));
		}
		next();
	};
}

module.exports = validatorHandler;
