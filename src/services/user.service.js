// const boom = require("@hapi/boom");
// const getConnection = require("../libs/postgres");
const debug = require("debug")("my-app:user-service");
const pool = require("../libs/postgres.pool");
class UserService {
	constructor() {
		this.pool = pool;
		this.pool.on("error", (err) => debug("Error en el pool de conexion"));
	}

	async create(data) {
		return data;
	}

	async find() {
		const query = "SELECT * FROM tasks;";
		const response = await this.pool.query(query);
		return response.rows;
	}

	async findOne(id) {
		return { id };
	}

	async update(id, changes) {
		return { id, changes };
	}

	async delete(id) {
		return { id };
	}
}

module.exports = UserService;
