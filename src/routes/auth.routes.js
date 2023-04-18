const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { config } = require("../config/config");

const secret = config.secret_key;

const router = express.Router();

router.post(
	"/login",
	passport.authenticate("local", { session: false }),
	async (req, res, next) => {
		try {
			const user = req.user;
			const payload = {
				sub: user.id,
				role: user.role,
			};
			const token = jwt.sign(payload, secret);
			res.json({
				user,
				token,
			});
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
