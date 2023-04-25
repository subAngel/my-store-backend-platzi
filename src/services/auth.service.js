const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");

const UserService = require("./user.service");
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
}

module.exports = AuthService;
