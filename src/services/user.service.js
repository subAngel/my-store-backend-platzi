const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");
const debug = require("debug")("my-app:user-service");

const { models } = require("../libs/sequelize");
class UserService {
	constructor() {}

	async create(data) {
		try {
			const hash = await bcrypt.hash(data.password, 10);
			const newUser = await models.User.create({
				...data,
				password: hash,
			});
			delete newUser.dataValues.password;
			return newUser;
		} catch (error) {
			throw boom.badRequest("Invalid data");
		}
	}

	async find() {
		const response = await models.User.findAll({
			include: "customer",
		});
		// delete response.dataValues.password;
		return response;
	}

	async findByEmail(email) {
		try {
			const user = await models.User.findOne({
				where: { email },
			});
			return user;
		} catch (error) {
			throw boom.notFound(`User with email "${email}" not found`);
		}
	}

	async findByUsername(username) {
		try {
			const user = await models.User.findOne({
				where: { username },
			});
			return user;
		} catch (error) {
			throw boom.notFound(`User with username "${username} not found"`);
		}
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
