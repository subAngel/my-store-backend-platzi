const { models } = require("../libs/sequelize");
const boom = require("@hapi/boom");

class OrdersProductsService {
	constructor() {}

	async find() {
		const response = await models.OrdersProduct.findAll();
		return response;
	}

	async findOne(id) {
		const op = await models.OrdersProduct.findByPk(id);
		if (!op) {
			throw boom.notFound("Not found");
		}
		return op;
	}

	async create(data) {
		const op = await models.OrdersProduct.create(data);
		return op;
	}

	async update(id, data) {
		const op = await this.findOne(id);
		const newOP = await op.update(data);
		return newOP;
	}

	async delete(id) {
		const op = await this.findOne(id);
		const res = await op.destroy();
		return res;
	}
}

module.exports = OrdersProductsService;
