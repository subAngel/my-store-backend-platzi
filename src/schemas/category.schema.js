const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const image = Joi.string().uri();
const description = Joi.string().min(10).max(200);

const createCategorySchema = Joi.object({
	name: name.required(),
	description: description.required(),
	image: image.required(),
});

const updateCategorySchema = Joi.object({
	name: name,
	description: description,
	image: image,
});

const getCategorySchema = Joi.object({
	id: id.required(),
});

module.exports = {
	createCategorySchema,
	updateCategorySchema,
	getCategorySchema,
};
