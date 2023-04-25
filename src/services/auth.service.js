const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserService = require("./user.service");
const { config } = require("../config/config");

const service = new UserService();
class AuthService {
	async getUser(username, password) {
		const user = await service.findByUsername(username);
		if (!user) {
			throw boom.notFound();
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (isMatch) {
			throw boom.unauthorized();
		}
		delete user.dataValues.password;
		return user;
	}

	signToken(user) {
		const payload = {
			sub: user.id,
			role: user.role,
		};
		const token = jwt.sign(payload, config.secret_key);
		return {
			user,
			token,
		};
	}

	sendMail(email) {}
}

module.exports = AuthService;
