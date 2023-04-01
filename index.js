const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('my-store:index');

const app = express();
// * Settings
app.set('port', process.env.PORT || 3000);

// * Middlewares
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(app.get('port'), () => {
  debug(`server is listening on http://localhost:${app.get('port')}`);
});
