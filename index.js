const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('my-store:index');
const { faker } = require('@faker-js/faker');

const app = express();
// * Settings
app.set('port', process.env.PORT || 3000);

// * Middlewares
app.use(morgan('dev'));

// * Routes
app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/products', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let i = 0; i < limit; i++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price()),
      image: faker.image.imageUrl(),
    });
  }
  res.json(products);
});
app.get('/products/filter', (req, res) => {
  res.send('yo soy un filter');
});
app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    name: 'phone',
    price: 100,
    id,
  });
});
app.get('/category/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({ categoryId, productId });
});

app.listen(app.get('port'), () => {
  debug(`server is listening on http://localhost:${app.get('port')}`);
});
