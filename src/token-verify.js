const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.SECRET_KEY;
const token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTY4MTg0MTI2OH0.fh2PmkGeZKIPGnKAYxXn2N8nWcVTTCXssP_o_P7ZU-U";

function verifyToken(token, secret) {
	return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);

console.log(payload);
