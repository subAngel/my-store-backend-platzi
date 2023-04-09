const { config } = require("../config/config");

const MOTOR_DB = "postgres";

const USER = encodeURIComponent(config.db_user);
const PASSWORD = encodeURIComponent(config.db_password);
const URI = `${MOTOR_DB}://${USER}:${PASSWORD}@${config.db_host}:${config.db_port}/${config.db_name}`;

module.exports = {
	development: {
		url: URI,
		dialect: MOTOR_DB,
	},
	production: {
		url: URI,
		dialect: MOTOR_DB,
	},
};
