const Joi = require("joi");

const id = Joi.number().integer();
const delivered = Joi.boolean();
const customerId = Joi.number().integer();

const createOrderSchema = Joi.object({
	delivered,
	customerId: customerId.required(),
});

const updateOrderSchema = Joi.object({
	delivered,
	customerId,
});

const getOrderSchema = Joi.object({
	id: id.required(),
});

module.exports = {
	createOrderSchema,
	updateOrderSchema,
	getOrderSchema,
};
