const { Model, DataTypes, Sequelize } = require("sequelize");
const { CATEGORY_TABLE } = require("./category.model");
// const sequelize = require("../../libs/sequelize");

const PRODUCT_TABLE = "products";

const productSchema = {
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
	price: {
		allowNull: false,
		type: DataTypes.DECIMAL,
	},
	image: {
		allowNull: true,
		type: DataTypes.STRING,
	},
	description: {
		allowNull: false,
		type: DataTypes.STRING,
	},
	isBlock: {
		allowNull: false,
		type: DataTypes.BOOLEAN,
		field: "is_block",
		defaultValue: false,
	},
	createdAt: {
		allowNull: false,
		type: DataTypes.DATE,
		field: "created_at",
		defaultValue: Sequelize.NOW,
	},
	categoryId: {
		field: "category_id",
		allowNull: false,
		type: DataTypes.INTEGER,
		references: {
			model: CATEGORY_TABLE,
			key: "id",
		},
		onUpdate: "CASCADE",
		onDelete: "SET NULL",
	},
};

class Product extends Model {
	static associate(models) {
		this.belongsTo(models.Category, {
			as: "category",
		});
	}
	static config(sequelize) {
		return {
			sequelize,
			tableName: PRODUCT_TABLE,
			modelName: "Product",
			timestamps: false,
		};
	}
}

module.exports = {
	PRODUCT_TABLE,
	productSchema,
	Product,
};
