const boom = require("@hapi/boom");
// const debug = require("debug")("my-app:user-service");

const { models } = require("../libs/sequelize");
class UserService {
	constructor() {}

	async create(data) {
		return data;
	}

	async find() {
		try {
			const response = await models.User.findAll();
			return response;
		} catch (error) {
			throw boom.badGateway("Error de la consulta");
		}
	}

	async findOne(id) {
		return { id };
	}

	async update(id, changes) {
		return { id, changes };
	}

	async delete(id) {
		return { id };
	}
}

module.exports = UserService;
