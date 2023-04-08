const { Model, Sequelize, DataTypes } = require("sequelize");

const ORDER_TABLE = "orders";

const OrdersSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	delivered: {
		// allowNull: false,
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
	createdAt: {
		allowNull: false,
		type: DataTypes.DATE,
		field: "created_at",
		defaultValue: Sequelize.NOW,
	},
	// TODO Crear el customer id
};

class Order extends Model {
	static associate() {
		// associations
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: ORDER_TABLE,
			modelName: "Order",
			timestamps: false,
		};
	}
}

module.exports = {
	Order,
	OrdersSchema,
	ORDER_TABLE,
};
