const { config } = require("../config/config");

const MOTOR_DB = "postgres";

const USER = encodeURIComponent(config.db_user);
const PASSWORD = encodeURIComponent(config.db_password);
const URI = `${MOTOR_DB}://${USER}:${PASSWORD}@${config.db_host}:${config.db_port}/${config.db_name}`;

module.exports = {
	development: {
		url: config.db_url,
		dialect: MOTOR_DB,
	},
	production: {
		url: config.db_url,
		dialect: MOTOR_DB,
	},
};
