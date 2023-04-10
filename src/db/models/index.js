const { User, UserSchema } = require("./user.model");
const { Product, productSchema } = require("./product.model");
const { Category, CategorySchema } = require("./category.model");
const { Customer, CustomerSchema } = require("./customer.model");
const { Order, OrdersSchema } = require("./order.model");
const { OrdersProduct, OrdersProductSchema } = require("./orders-products.model");

function setupModels(sequelize) {
	User.init(UserSchema, User.config(sequelize));
	Customer.init(CustomerSchema, Customer.config(sequelize));
	Category.init(CategorySchema, Category.config(sequelize));
	Product.init(productSchema, Product.config(sequelize));
	Order.init(OrdersSchema, Order.config(sequelize));
	OrdersProduct.init(OrdersProductSchema, OrdersProduct.config(sequelize));

	User.associate(sequelize.models);
	Customer.associate(sequelize.models);
	Category.associate(sequelize.models);
	Product.associate(sequelize.models);
	Order.associate(sequelize.models);
	OrdersProduct.associate(sequelize.models);
}

module.exports = setupModels;
