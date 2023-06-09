const { Model, Sequelize, DataTypes } = require("sequelize");

const { CUSTOMER_TABLE } = require("./customer.model");
const ORDER_TABLE = "orders";

const OrdersSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	delivered: {
		allowNull: false,
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
	customerId: {
		field: "customer_id",
		allowNull: false,
		type: DataTypes.INTEGER,
		references: {
			model: CUSTOMER_TABLE,
			key: "id",
		},
		onUpdate: "CASCADE",
		onDelete: "SET NULL",
	},
	createdAt: {
		allowNull: false,
		type: DataTypes.DATE,
		field: "created_at",
		defaultValue: Sequelize.NOW,
	},
	total: {
		type: DataTypes.VIRTUAL,
		get() {
			if (this.items) {
				if (this.items.length > 0) {
					return this.items.reduce((total, item) => {
						return total + item.price * item.OrdersProducts.amount;
					}, 0);
				}
				return 0;
			} else {
				return 0;
			}
		},
	},
};

class Order extends Model {
	static associate(models) {
		this.belongsTo(models.Customer, {
			as: "customer",
		});
		this.belongsToMany(models.Product, {
			as: "items",
			// @through: significa a travez de que tabla se va a resolver la relacion
			through: models.OrdersProducts,
			foreignKey: "orderId",
			otherKey: "productId",
		});
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
