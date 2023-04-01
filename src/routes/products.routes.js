const express = require('express');
const productService = require('../services/product.service');

const router = express.Router();
const service = new productService();

router.get('/', (req, res) => {
	const productos = service.find();
	res.json(productos);
});

router.get('/filter', (req, res) => {
	res.send('yo soy un filter');
});

router.get('/:id', (req, res) => {
	const { id } = req.params;
	const product = service.findOne(id);
	res.json(product);
});

router.post('/', (req, res) => {
	const body = req.body;
	res.json({ msg: 'created', data: body });
});

router.patch('/:id', (req, res) => {
	const { id } = req.params;
	const body = req.body;
	res.json({
		msg: 'updated',
		data: body,
		id,
	});
});

router.delete('/:id', (req, res) => {
	const { id } = req.params;
	res.json({ msg: 'deleted', id });
});

module.exports = router;
