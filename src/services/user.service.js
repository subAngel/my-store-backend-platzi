const boom = require("@hapi/boom");
// const debug = require("debug")("my-app:user-service");

const { models } = require("../libs/sequelize");
class UserService {
	constructor() {}

	async create(data) {
		try {
			const newUser = await models.User.create(data);
			return newUser;
		} catch (error) {
			throw boom.badRequest("Invalid data");
		}
	}

	async find() {
		const response = await models.User.findAll({
			include: "customer",
		});
		return response;
	}

	async findOne(id) {
		const user = await models.User.findByPk(id);
		if (!user) {
			throw boom.notFound("User not found");
		}
		return user;
	}

	async update(id, changes) {
		const user = await this.findOne(id);
		const userUpdated = await user.update(changes);
		return userUpdated;
	}

	async delete(id) {
		const user = await this.findOne(id);
		await user.destroy();
		return { id };
	}
}

module.exports = UserService;
