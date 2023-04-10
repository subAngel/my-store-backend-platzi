// const { faker } = require("@faker-js/faker");
// const debug = require("debug")("my-store:product-service");
const boom = require("@hapi/boom");

const { models } = require("../libs/sequelize");

class ProdutService {
	constructor() {}

	async create(data) {
		const newProduct = await models.Product.create(data);
		return newProduct;
	}

	async find(query) {
		const options = {
			include: ["category"],
			where: {},
		};
		const { limit, offset } = query;
		if (limit && offset) {
			options.limit = limit;
			options.offset = offset;
		}
		const { price } = query;
		if (price) {
			options.where.price = price;
		}
		const response = await models.Product.findAll(options);
		return response;
	}

	async findOne(id) {
		const product = await models.Product.findByPk(id);
		if (!product) {
			throw boom.notFound("Product not found");
		}
		if (product.isBlock) {
			throw boom.conflict("Product is block");
		}
		return product;
	}

	async patch(id, changes) {
		const product = await this.findOne(id);
		const newProdut = await product.update(changes);
		// si no se encuetra el producto regresa un -1
		return newProdut;
	}

	async delete(id) {
		const product = await this.findOne(id);
		await product.destroy();
		return id;
	}
}

module.exports = ProdutService;
