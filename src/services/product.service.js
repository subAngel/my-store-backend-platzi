const { faker } = require("@faker-js/faker");
const boom = require("@hapi/boom");
class ProdutService {
	static _productServiceInstance = null;

	static getInstance() {
		if (ProdutService._productServiceInstance == null) {
			ProdutService._productServiceInstance = new ProdutService();
		}
		return ProdutService._productServiceInstance;
	}
	constructor() {
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
		return this.productos;
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
