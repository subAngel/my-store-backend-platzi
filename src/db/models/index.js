const { User, UserSchema } = require("./user.model");
const { Product, productSchema } = require("./product.model");
const { Category, CategorySchema } = require("./category.model");

function setupModels(sequelize) {
	User.init(UserSchema, User.config(sequelize));
	Product.init(productSchema, Product.config(sequelize));
	Category.init(CategorySchema, Category.config(sequelize));
}

module.exports = setupModels;
