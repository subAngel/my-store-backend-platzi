const { faker } = require('@faker-js/faker');
class ProdutService {
	constructor() {
		this.productos = [];
		this.generate();
	}
	generate() {
		const limit = 100;
		for (let i = 0; i < limit; i++) {
			this.productos.push({
				id: faker.datatype.uuid(),
				name: faker.commerce.productName(),
				price: parseInt(faker.commerce.price()),
				image: faker.image.imageUrl(),
			});
		}
	}
	create() {}
	find() {
		return this.productos;
	}
	findOne(id) {
		return this.productos.find((item) => item.id === id);
	}
	update() {}
	delete() {}
}

module.exports = ProdutService;
