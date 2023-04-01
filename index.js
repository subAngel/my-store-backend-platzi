const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('my-store:index');

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
  res.json({
    name: 'phone',
    price: 100,
  });
});

app.listen(app.get('port'), () => {
  debug(`server is listening on http://localhost:${app.get('port')}`);
});
