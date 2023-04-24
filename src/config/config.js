require("dotenv").config();
const config = {
	env: process.env.NODE_ENV || "dev",
	isProd: process.env.NODE_ENV === "production",
	port: process.env.PORT || 3000,
	db_user: process.env.DB_USER,
	db_password: process.env.DB_PASS,
	db_host: process.env.DB_HOST,
	db_name: process.env.DB_NAME,
	db_port: process.env.DB_PORT,
	db_url: process.env.DATABASE_URL,
	api_key: process.env.API_KEY,
	secret_key: process.env.SECRET_KEY,
	mail_user: process.env.MAIL_USER,
	mail_pass: process.env.MAIL_PASS,
};

module.exports = { config };
