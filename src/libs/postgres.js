const { Client } = require("pg");
// const debug = require("debug")("my-store:database");
// crear una instancia del cliente

async function getConnection() {
	const client = new Client({
		host: "localhost",
		port: "5432",
		user: "angel",
		password: "admin",
		database: "my_store",
	});
	await client.connect();
	return client;
}

module.exports = getConnection;
