const { Model, DataTypes, Sequelize } = require("sequelize");

const ORDERS_PRODUCTS_TABLE = "orders_products";

const OrdersProductSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	amount: {
		allowNull: false,
		type: DataTypes.DECIMAL,
	},
	createdAt: {
		allowNull: false,
		type: DataTypes.DATE,
		field: "created_at",
		defaultValue: Sequelize.NOW,
	},
};

class OrdersProduct extends Model {
	static associate() {
		// associations
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: ORDERS_PRODUCTS_TABLE,
			modelName: "OrdersProducts",
			timestamps: false,
		};
	}
}

module.exports = {
	OrdersProduct,
	OrdersProductSchema,
	ORDERS_PRODUCTS_TABLE,
};
