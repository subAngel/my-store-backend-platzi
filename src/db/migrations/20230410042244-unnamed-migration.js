"use strict";

const {
	ORDERS_PRODUCTS_TABLE,
	OrdersProductSchema,
} = require("../models/orders-products.model");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface) {
		await queryInterface.createTable(ORDERS_PRODUCTS_TABLE, OrdersProductSchema);
	},

	async down(queryInterface) {
		await queryInterface.dropTable(ORDERS_PRODUCTS_TABLE);
	},
};
