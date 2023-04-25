const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const { config } = require("../config/config");
const AuthService = require("../services/auth.service");

const secret = config.secret_key;
const service = new AuthService();

const router = express.Router();

router.post(
	"/login",
	passport.authenticate("local", { session: false }),
	async (req, res, next) => {
		try {
			const user = req.user;

			res.json(service.signToken(user));
		} catch (error) {
			next(error);
		}
	}
);

router.post("/recovery", async (req, res, next) => {
	try {
		const { email } = req.body;
	} catch (error) {
		next(error);
	}
});

module.exports = router;
