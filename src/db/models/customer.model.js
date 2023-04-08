const { Model, DataTypes, Sequelize } = require("sequelize");

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
	// TODO crear la asociacion con el user
};

class Customer extends Model {
	static associate() {
		// associations
	}

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
