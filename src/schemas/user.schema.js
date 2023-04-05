const Joi = require("joi");

const id = Joi.string().uuid();
const username = Joi.string();
const fullname = Joi.string().min(10);
const password = Joi.string().min(8);
const email = Joi.string().email();

const createUserSchema = Joi.object({
	username: username.required(),
	fullname: fullname.required(),
	password: password.required(),
	email: email,
});

const updateUserSchema = Joi.object({
	username: username,
	fullname: fullname,
	password: password,
	email: email,
});

const getUserSchema = Joi.object({
	id: id.required(),
});

module.exports = {
	createUserSchema,
	updateUserSchema,
	getUserSchema,
};
