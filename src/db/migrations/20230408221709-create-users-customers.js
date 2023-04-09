"use strict";

const { CustomerSchema, CUSTOMER_TABLE } = require("./../models/customer.model");
const { USER_TABLE, UserSchema } = require("./../models/user.model");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface) {
		await queryInterface.createTable(USER_TABLE, UserSchema);
		// await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
	},

	async down(queryInterface) {
		// await queryInterface.drop(CUSTOMER_TABLE);
		await queryInterface.drop(USER_TABLE);
	},
};
