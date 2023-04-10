const express = require("express");
const productService = require("../services/product.service");
const validatorHandler = require("../middlewares/validator.handler");
const {
	createProductSchema,
	getProductSchema,
	updateProductSchema,
	queryProductSchema,
} = require("../schemas/product.schema");

const router = express.Router();
const service = new productService();

router.get(
	"/",
	validatorHandler(queryProductSchema, "query"),
	async (req, res, next) => {
		try {
			const productos = await service.find(req.query);
			res.json(productos);
		} catch (error) {
			next(error);
		}
	}
);

router.get("/filter", async (req, res) => {
	res.send("yo soy un filter");
});

router.get(
	"/:id",
	validatorHandler(getProductSchema, "params"),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const product = await service.findOne(id);
			res.json(product);
		} catch (error) {
			next(error);
		}
	}
);

router.post(
	"/",
	validatorHandler(createProductSchema, "body"),
	async (req, res, next) => {
		try {
			const body = req.body;
			const newProduct = await service.create(body);
			res.status(201).json(newProduct);
		} catch (error) {
			next(error);
		}
	}
);

router.patch(
	"/:id",
	validatorHandler(getProductSchema, "params"),
	validatorHandler(updateProductSchema, "body"),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const body = req.body;
			const product = await service.patch(id, body);
			res.status(200).json(product);
		} catch (error) {
			next(error);
		}
	}
);

router.delete(
	"/:id",
	validatorHandler(getProductSchema, "params"),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const response = await service.delete(id);
			res.status(200).json({
				response,
				msg: "Product deleted",
			});
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
