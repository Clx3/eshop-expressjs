import "regenerator-runtime/runtime.js";

import express from 'express';
import multer from 'multer';
import path from 'path';
import bodyParser from 'body-parser';
import Database from './db/database';
import fs from 'fs';

var app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'https://eshop-angular.herokuapp.com/');

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
  let filters = null;

  if (Object.keys(request.query).length !== 0) {
    const categoryId = request.query.categoryId ? request.query.categoryId : null;
    const searchText = request.query.searchText ? request.query.searchText : null;

    filters = {
      searchText: searchText,
      categoryId: categoryId
    };
  }

  const products = await database.productDao.getProductsByFiltersAsync(filters);
  
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

app.put('/products/', async(request, response) => {
  const product = request.body;

  const updatedProduct = await database.productDao.updateProductAsync(product);

  response.send(updatedProduct);
});

app.delete('/products/:id([0-9]+)', async(request, response) => {
  const deleteId = request.params.id;

  await database.productDao.deleteProductAsync(deleteId);

  response.send({ id: deleteId });
});

app.get('/category/', async(request, response) => {
  const categories = await database.categoryDao.getCategoriesAsync();

  response.send(categories);
});

app.post('/category/', async(request, response) => {
  const category = request.body;

  const insertedCategory = await database.categoryDao.insertCategoryAsync(category);

  response.send(insertedCategory);
});

app.put('/category/', async(request, response) => {
  const category = request.body;

  const updatedCategory = await database.categoryDao.updateCategoryAsync(category);

  response.send(updatedCategory);
});

app.delete('/category/:id([0-9]+)', async(request, response) => {
  const deleteId = request.params.id;

  await database.categoryDao.deleteCategoryAsync(deleteId);

  response.send({ id: deleteId });
});

app.get('/products/:id([0-9]+)/ratings/', async(request, response) => {
  const productId = request.params.id;

  const ratings = await database.ratingDao.getRatingsByProductIdAsync(productId);

  response.send(ratings);
});

app.post('/ratings/', async(request, response) => {
  const rating = request.body;

  const insertedRating = await database.ratingDao.insertRatingAsync(rating);

  response.send(insertedRating);
});

/* Multer related configs */
const imageFilter = function(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      req.fileValidationError = 'Only image files are allowed!';
      return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'public/');
  },

  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});


app.post('/productimage/', async(request, response) => {
    let upload = multer({ storage: storage, fileFilter: imageFilter }).single('product_image');

    upload(request, response, function(err) {
        // req.file contains information of uploaded file

        if (request.fileValidationError) {
            return response.send(req.fileValidationError);
        }
        else if (!request.file) {
            return response.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return response.send(err);
        }
        else if (err) {
            return response.send(err);
        }

        //Rename file
        const uploadedFile = request.file;
        const newPath = `public/product_image_${Number(request.body.productId)}${path.extname(uploadedFile.originalname)}`;
        fs.rename(uploadedFile.path, newPath, () => null);

        // Display uploaded image for user validation
        response.send({message: `You have uploaded this image: ${request.file.path}`});
    });
});


var server = app.listen(process.env.PORT || 8080, function () {
  console.log('Server listening in http://localhost:3000/employeess')
});

