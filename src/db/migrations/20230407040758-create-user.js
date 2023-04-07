"use strict";

const { UserSchema, USER_TABLE } = require("../models/user.model");
const { productSchema, PRODUCT_TABLE } = require("../models/product.model");
const { CategorySchema, CATEGORY_TABLE } = require("../models/category.model");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface) {
		await queryInterface.createTable(USER_TABLE, UserSchema);
		await queryInterface.createTable(PRODUCT_TABLE, productSchema);
		await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
	},

	async down(queryInterface) {
		await queryInterface.dropTable(USER_TABLE);
		await queryInterface.dropTable(PRODUCT_TABLE);
		await queryInterface.dropTable(CATEGORY_TABLE);
	},
};
