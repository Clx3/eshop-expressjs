import express from 'express';
import bodyParser from 'body-parser';
import Database from './db/database';

var app = express();
app.use(bodyParser.json());
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
const database = new Database();

app.get('/products/', async(request, response) => {
  const products = await database.productDao.getProductsAsync();

  response.send(products);
});

app.get('/products/:id([0-9]+)', async(request, response) => {
  const id = request.params.id;

  const product = await database.productDao.getProductByIdAsync(id);

  response.send(product);
});

app.post('/products/', async(request, response) => {
  const product = request.body;

  const insertProduct = await database.productDao.insertProductAsync(product);

  response.send(insertProduct);
});

var server = app.listen(3000, function () {
  console.log('Server listening in http://localhost:3000/employees')
});

