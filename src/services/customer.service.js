const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize");
const bcrypt = require("bcrypt");

class CustomerService {
	constructor() {}

	async find() {
		const response = await models.Customer.findAll({
			include: ["user"],
		});
		return response;
	}

	async create(data) {
		const hash = await bcrypt.hash(data.user.password, 10);
		const newData = {
			...data,
			user: {
				...data.user,
				password: hash,
			},
		};
		const newCustomer = await models.Customer.create(newData, {
			include: "user",
		});
		delete newCustomer.dataValues.user.dataValues.password;
		return newCustomer;
	}

	async findOne(id) {
		const customer = await models.Customer.findByPk(id);
		if (!customer) {
			throw boom.notFound("Customer not found");
		}
		return customer;
	}

	async update(id, changes) {
		const customer = await this.findOne(id);
		const newCustomer = await customer.update(changes);
		return newCustomer;
	}

	async delete(id) {
		const customer = await this.findOne(id);
		await customer.destroy();
		return {
			message: "Customer deleted",
			id: parseInt(id),
		};
	}
}

module.exports = CustomerService;
