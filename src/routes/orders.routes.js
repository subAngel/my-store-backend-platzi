const express = require("express");
const orderService = require("../services/order.service.");
const validatorHandler = require("../middlewares/validator.handler");
const {
	createOrderSchema,
	getOrderSchema,
	updateOrderSchema,
} = require("../schemas/order.schema");
const { valid } = require("joi");
const { updateProductSchema } = require("../schemas/product.schema");

const router = express.Router();
const service = new orderService();

router.get("/", async (req, res) => {
	const orders = await service.find();
	res.json(orders);
});

router.get(
	"/:id",
	validatorHandler(getOrderSchema, "params"),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const order = await service.findOne(id);
			res.json(order);
		} catch (error) {
			next(error);
		}
	}
);

router.post(
	"/",
	validatorHandler(createOrderSchema, "body"),
	async (req, res, next) => {
		try {
			const order = req.body;
			const newOrder = await service.create(order);
			res.status(201).json(newOrder);
		} catch (error) {
			next(error);
		}
	}
);

router.patch(
	"/:id",
	validatorHandler(getOrderSchema, "params"),
	validatorHandler(updateProductSchema, "body"),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const order = await service.patch(id, body);
			res.status(200).json(order);
		} catch (error) {
			next(error);
		}
	}
);

router.delete(
	"/:id",
	validatorHandler(getOrderSchema, "params"),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const response = await service.delete(id);
			res.status(200).json({
				response,
				msg: "Order deleted",
			});
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
