const Joi = require("joi");

const id = Joi.string();
const username = Joi.string()
	.regex(/^[A-Za-z][A-Za-z0-9_]+$/)
	.min(4)
	.max(30);
const password = Joi.string().alphanum().min(8);
const email = Joi.string().email();
const role = Joi.string().min(5);

const createUserSchema = Joi.object({
	username: username.required(),
	password: password.required(),
	email: email.required(),
	role: role,
});

const updateUserSchema = Joi.object({
	username: username,
	password: password,
	email: email,
	role: role,
});

const getUserSchema = Joi.object({
	id: id.required(),
});

module.exports = {
	createUserSchema,
	updateUserSchema,
	getUserSchema,
};
