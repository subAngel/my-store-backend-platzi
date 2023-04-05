const { faker } = require("@faker-js/faker");
const debug = require("debug")("my-store:product-service");
const boom = require("@hapi/boom");

const pool = require("../libs/postgres.pool");
class ProdutService {
	constructor() {
		this.pool = pool;
		this.pool.on("error", (err) => debug("Error en el pool de conexion"));
		this.productos = [];
		this.generate();
	}

	async generate() {
		const limit = 100;
		for (let i = 0; i < limit; i++) {
			this.productos.push({
				id: faker.datatype.uuid(),
				name: faker.commerce.productName(),
				price: parseInt(faker.commerce.price()),
				image: faker.image.imageUrl(),
				isBlock: faker.datatype.boolean(),
			});
		}
	}

	async create(data) {
		const newProduct = {
			id: faker.datatype.uuid(),
			...data,
		};
		this.productos.push(newProduct);
		return newProduct;
	}

	async find() {
		const query = "SELECT * FROM tasks";
		const rta = await this.pool.query(query);
		return rta.rows;
	}

	async findOne(id) {
		const product = this.productos.find((item) => item.id === id);
		if (!product) {
			throw boom.notFound("Product not found");
		}
		if (product.isBlock) {
			throw boom.conflict("Product is block");
		}
		return product;
	}

	async patch(id, changes) {
		const index = this.productos.findIndex((item) => item.id === id);
		// si no se encuetra el producto regresa un -1
		if (index === -1) {
			throw boom.notFound("Product not found");
		}
		const producto = this.productos[index];
		this.productos[index] = {
			...producto,
			...changes,
		};
		return this.productos[index];
	}

	async delete(id) {
		const index = this.productos.findIndex((item) => item.id === id);
		if (index === -1) {
			throw boom.notFound("Product not found");
		}
		this.productos.splice(index, 1);
		return { msg: "deleted" };
	}
}

module.exports = ProdutService;
