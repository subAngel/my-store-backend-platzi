const { models } = require("../libs/sequelize");
const boom = require("@hapi/boom");

class OrderService {
	constructor() {}

	async find() {
		const orders = await models.Order.findAll();
		return orders;
	}

	async findOne(id) {
		const order = await models.Order.findByPk(id);
		if (!order) {
			throw boom.notFound("Order not found");
		}
		return order;
	}

	async create(data) {
		const newOrder = await models.Order.create(data);
		return newOrder;
	}

	async update(id, changes) {
		const order = await this.findOne(id);
		const newOrder = await order.update(changes);
		return newOrder;
	}

	async delete(id) {
		const order = await this.findOne(id);
		const response = await order.destroy();
		return response;
	}
}

module.exports = OrderService;
