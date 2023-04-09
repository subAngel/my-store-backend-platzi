const { Model, DataTypes, Sequelize } = require("sequelize");

const { USER_TABLE } = require("./user.model");

const CUSTOMER_TABLE = "customers";

const CustomerSchema = {
	id: {
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
		type: DataTypes.INTEGER,
	},
	name: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	lastname: {
		allowNull: true,
		type: DataTypes.STRING,
	},
	phone: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	createdAt: {
		allowNull: false,
		type: DataTypes.DATE,
		field: "created_at",
		defaultValue: Sequelize.NOW,
	},
};

class Customer extends Model {
	static associate() {}

	static config(sequelize) {
		return {
			sequelize,
			tableName: CUSTOMER_TABLE,
			modelName: "Customer",
			timestamps: false,
		};
	}
}

module.exports = { CUSTOMER_TABLE, Customer, CustomerSchema };
