const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().min(3).max(17);
const price = Joi.number().min(10);
const image = Joi.string().uri();
const description = Joi.string().min(10);
const categoryId = Joi.number().integer();

// paginacion
const limit = Joi.number().integer();
const offset = Joi.number().integer();

// price
const price_min = Joi.number();
const price_max = Joi.number();

const createProductSchema = Joi.object({
	name: name.required(),
	price: price.required(),
	image: image.required(),
	description: description.required(),
	categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
	name,
	price,
	image,
	description,
	categoryId,
});

const getProductSchema = Joi.object({
	id: id.required(),
});

const queryProductSchema = Joi.object({
	limit,
	offset,
	price,
	price_min,
	price_max: price_max.when("price_min", {
		is: Joi.number(),
		then: Joi.required(),
	}),
});

module.exports = {
	createProductSchema,
	updateProductSchema,
	getProductSchema,
	queryProductSchema,
};
