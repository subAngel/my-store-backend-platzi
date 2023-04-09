const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize");

class CustomerService {
	constructor() {}

	async find() {
		const response = await models.Customer.findAll();
		return response;
	}

	async create(data) {
		const newCustomer = await models.Customer.create(data);
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
		const response = await customer.destroy();
		return {
			message: "Customer deleted",
			id: parseInt(id),
		};
	}
}

module.exports = CustomerService;
