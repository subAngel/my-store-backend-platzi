"use strict";

const { DataTypes } = require("sequelize");
const { PRODUCT_TABLE } = require("../models/product.model");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface) {
		queryInterface.changeColumn(PRODUCT_TABLE, "price", {
			type: DataTypes.DOUBLE,
		});
	},

	async down(queryInterface, Sequelize) {},
};
