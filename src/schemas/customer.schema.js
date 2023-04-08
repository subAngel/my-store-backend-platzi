const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const lastname = Joi.string();
const phone = Joi.string();

const getCustomerSchema = Joi.object({
	id: id.required(),
});

const createCustomerSchema = Joi.object({
	name: name.required(),
	lastname: lastname.required(),
	phone: phone.required(),
});

const updateCustomerSchema = Joi.object({
	name,
	lastname,
	phone,
});

module.exports = {
	getCustomerSchema,
	createCustomerSchema,
	updateCustomerSchema,
};
