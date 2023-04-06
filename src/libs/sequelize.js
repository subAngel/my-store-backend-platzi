const { Sequelize } = require("sequelize");

const { config } = require("../config/config");
const setupModels = require("../db/models");

const USER = encodeURIComponent(config.db_user);
const PASSWORD = encodeURIComponent(config.db_password);
const URI = `postgres://${USER}:${PASSWORD}@${config.db_host}:${config.db_port}/${config.db_name}`;

const sequelize = new Sequelize(URI, {
	dialect: "postgres",
	//logging: console.log, // * Default, displays the first parameter of the log function call
	//logging: (...msg) => console.log(msg), // * Displays all log function call parameters
	logging: false, // * Disables logging
	//logging: (msg) => logger.debug(msg), // * Use custom logger (e.g. Winston or Bunyan), displays the first parameter
	//logging: logger.debug.bind(logger), // * Alternative way to use custom logger, displays all messages
});

setupModels(sequelize);

sequelize.sync();

module.exports = sequelize;
