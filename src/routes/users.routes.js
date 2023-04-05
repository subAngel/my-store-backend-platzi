const express = require("express");
const { faker } = require("@faker-js/faker");
const UserService = require("../services/user.service");

const router = express.Router();

router.get("/", (req, res) => {
	const { size } = req.query;
	const users = [];
	const limit = size || 10;
	for (let i = 0; i < limit; i++) {
		users.push({
			name: faker.name.firstName(),
			lastName: faker.name.lastName(),
			image: faker.image.avatar(),
		});
	}
	res.json(users);
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
