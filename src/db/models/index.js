const { User, UserSchema } = require("./user.model");
const { Product, productSchema } = require("./product.model");
const { Category, CategorySchema } = require("./category.model");
const { Customer, CustomerSchema } = require("./customer.model");
const { Order, OrdersSchema } = require("./order.model");
// const { OrdersProduct, OrdersProductSchema } = require("./orders-products.model");

function setupModels(sequelize) {
	User.init(UserSchema, User.config(sequelize));
	Customer.init(CustomerSchema, Customer.config(sequelize));

	User.associate(sequelize.models);
	Customer.associate(sequelize.models);
}

module.exports = setupModels;
