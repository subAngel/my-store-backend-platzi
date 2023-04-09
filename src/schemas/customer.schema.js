const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const lastname = Joi.string();
const phone = Joi.string();
const userId = Joi.number().integer();
// * user info
const username = Joi.string()
	.regex(/^[A-Za-z][A-Za-z0-9_]+$/)
	.min(4)
	.max(30);
const password = Joi.string().alphanum().min(8);
const email = Joi.string().email();

const getCustomerSchema = Joi.object({
	id: id.required(),
});

const createCustomerSchema = Joi.object({
	name: name.required(),
	lastname: lastname.required(),
	phone: phone.required(),
	user: Joi.object({
		username: username.required(),
		password: password.required(),
		email: email.required(),
	}),
});

const updateCustomerSchema = Joi.object({
	name,
	lastname,
	phone,
	userId,
});

module.exports = {
	getCustomerSchema,
	createCustomerSchema,
	updateCustomerSchema,
};
