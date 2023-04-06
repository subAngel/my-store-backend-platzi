const { User, UserSchema } = require("./user.model");
const { Product, productSchema } = require("./product.model");

function setupModels(sequelize) {
	User.init(UserSchema, User.config(sequelize));
	Product.init(productSchema, Product.config(sequelize));
}

module.exports = setupModels;
