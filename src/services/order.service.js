const { models } = require("../libs/sequelize");
const boom = require("@hapi/boom");

class OrderService {
	constructor() {}

	async find() {
		const allOrders = await models.Order.findAll();
		return allOrders;
	}

	async findByUser(userId) {
		const orders = await models.Order.findAll({
			where: {
				"$customer.user.id$": userId,
			},
			include: [
				{
					association: "customer",
					include: ["user"],
				},
				"items",
			],
		});
		return orders;
	}

	async findOne(id) {
		const order = await models.Order.findByPk(id, {
			include: [
				{
					association: "customer",
					include: ["user"],
				},
				"items",
			],
		});
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
		await order.destroy();
		return id;
	}
	async addItem(data) {
		const newItem = await models.OrdersProducts.create(data);
		return newItem;
	}
}

module.exports = OrderService;
