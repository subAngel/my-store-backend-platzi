const { Sequelize } = require("sequelize");

const { config } = require("../config/config");
const setupModels = require("../db/models");

const MOTOR_DB = "postgres";

const options = {
	dialect: MOTOR_DB,
	logging: config.isProd ? false : console.log,
};

if (config.isProd) {
	options.ssl = {
		rejectUnauthorized: false,
	};
}
const sequelize = new Sequelize(config.db_url, options);

setupModels(sequelize);

// sequelize.sync();

module.exports = sequelize;
