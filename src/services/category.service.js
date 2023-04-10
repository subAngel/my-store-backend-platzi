const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize");
const debug = require("debug")("my-store:category-service");

class CategoryService {
	constructor() {}

	async create(data) {
		try {
			const newCategory = await models.Category.create(data);
			return newCategory;
		} catch (error) {
			throw boom.conflict("Category already exists");
		}
	}

	async find() {
		const response = await models.Category.findAll();
		return response;
	}

	async findOne(id) {
		const category = await models.Category.findByPk(id);
		if (!category) {
			throw boom.notFound("Category not found");
		}
		return category;
	}

	async update(id, changes) {
		const category = await this.findOne(id);
		const newCategory = await category.update(changes);
		return newCategory;
	}

	async delete(id) {
		const category = await this.findOne(id);
		const response = await category.destroy();
		return response;
	}
}

module.exports = CategoryService;
