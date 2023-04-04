const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().min(5).max(20);
const description = Joi.string().min(10).max(200);

const createCategorySchema = Joi.object({
	name: name.required(),
	description: description.required(),
});

const updateCategorySchema = Joi.object({
	name: name.required(),
	description: description.required(),
});

const getCategorySchema = Joi.object({
	id: id.required,
});

module.exports = {
	createCategorySchema,
	updateCategorySchema,
	getCategorySchema,
};
