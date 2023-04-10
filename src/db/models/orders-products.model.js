const { Model, DataTypes, Sequelize } = require("sequelize");
const { ORDER_TABLE } = require("./order.model");
const { PRODUCT_TABLE } = require("./product.model");

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
		type: DataTypes.INTEGER,
	},
	createdAt: {
		allowNull: false,
		type: DataTypes.DATE,
		field: "created_at",
		defaultValue: Sequelize.NOW,
	},
	orderId: {
		field: "order_id",
		allowNull: false,
		type: DataTypes.INTEGER,
		references: {
			model: ORDER_TABLE,
			key: "id",
		},
		onUpdate: "CASCADE",
		onDelete: "SET NULL",
	},
	productId: {
		field: "product_id",
		allowNull: false,
		type: DataTypes.INTEGER,
		references: {
			model: PRODUCT_TABLE,
			key: "id",
		},
		onUpdate: "CASCADE",
		onDelete: "SET NULL",
	},
};

class OrdersProduct extends Model {
	static associate(models) {
		// this.
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
