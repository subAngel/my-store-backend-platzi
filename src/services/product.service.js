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
	create(data) {
		const newProduct = {
			id: faker.datatype.uuid(),
			...data,
		};
		this.productos.push(newProduct);
		return newProduct;
	}
	find() {
		return this.productos;
	}
	findOne(id) {
		return this.productos.find((item) => item.id === id);
	}

	update(id, changes) {
		const index = this.productos.findIndex((item) => item.id === id);
		// si no se encuetra el producto regresa un -1
		if (index === -1) {
			throw new Error('product not found');
		}
		const producto = this.productos[index];
		this.productos[index] = {
			...producto,
			...changes,
		};
		return this.productos[index];
	}

	delete(id) {
		const index = this.productos.findIndex((item) => item.id === id);
		if (index === -1) {
			throw new Error('product not found');
		}
		this.productos.splice(index, 1);
		return { msg: 'deleted' };
	}
}

module.exports = ProdutService;
