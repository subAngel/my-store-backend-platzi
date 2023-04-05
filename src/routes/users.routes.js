const express = require("express");
const { faker } = require("@faker-js/faker");
const userService = require("../services/user.service");

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

router.get("/:id", (req, res) => {
	const { id } = req.params;
	res.json({
		id,
		name: faker.name.firstName(),
		lastName: faker.name.lastName(),
		image: faker.image.avatar(),
	});
});

module.exports = router;
