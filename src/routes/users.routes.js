const express = require("express");
const { faker } = require("@faker-js/faker");
const userService = require("../services/user.service");
const validatoHandler = require("../middlewares/validator.handler");
const {
	createUserSchema,
	getUserSchema,
	updateUserSchema,
} = require("../schemas/user.schema");

const router = express.Router();
const service = new userService();

router.get("/", async (req, res, next) => {
	try {
		const users = await service.find();
		res.json(users);
	} catch (error) {
		next(error);
	}
});

router.get(
	"/:id",
	validatoHandler(getUserSchema, "params"),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const user = await service.findOne(id);
			res.json(user);
		} catch (error) {
			next(error);
		}
	}
);

router.post(
	"/",
	validatoHandler(createUserSchema, "body"),
	async (req, res, next) => {
		try {
			const body = req.body;
			const newUser = await service.create(body);
			res.status(201).json(newUser);
		} catch (error) {
			next(error);
		}
	}
);
router.patch(
	"/",
	validatoHandler(getUserSchema, "params"),
	validatoHandler(updateUserSchema, "body"),
	async (req, res, next) => {
		try {
			const { id } = req.params;
			const body = req.body;
			await service.update(id, body);
			res.status(200).json({
				id,
				message: "User updated",
			});
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
