const { User, UserSchema } = require("./user.model");
const { Product, productSchema } = require("./product.model");
const { Category, CategorySchema } = require("./category.model");
const { Customer, CustomerSchema } = require("./customer.model");
const { Order, OrdersSchema } = require("./order.model");
// const { OrdersProduct, OrdersProductSchema } = require("./orders-products.model");

function setupModels(sequelize) {
	User.init(UserSchema, User.config(sequelize));
	Product.init(productSchema, Product.config(sequelize));
	Category.init(CategorySchema, Category.config(sequelize));
	Customer.init(CustomerSchema, Customer.config(sequelize));
	Order.init(OrdersSchema, Order.config(sequelize));
	// OrdersProduct.init(OrdersProductSchema, OrdersProduct.config(sequelize));

	Customer.associate(sequelize.models); // generar la asociacion con usuarios
}

module.exports = setupModels;
