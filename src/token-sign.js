const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.SECRET_KEY;

const payload = {
	sub: 1,
	role: "customer",
};

function signToken(payload, secret) {
	return jwt.sign(payload, secret);
}

const token = signToken(payload, secret);

console.log(token);
