import mysql from 'mysql';
import util from 'util';

import { Constants } from '../constants';
import ProductDao from './product_dao';
import CategoryDao from './category_dao';

class Database {

  constructor() {
    this.categoryDao = new CategoryDao(this.getDatabase);
    this.productDao = new ProductDao(this.getDatabase);
    //this.initTestData();
  }

  async initTestData() {
    const category1 = {
      name: 'Shirts'
    };

    const category2 = {
      name: 'Shoes'
    };

    //await this.categoryDao.insertCategoryAsync(category1);
    //await this.categoryDao.insertCategoryAsync(category2);

    await this.productDao.getProductsAsync();
    await this.productDao.insertProductAsync({
      name: 'Test Product',
      description: 'Test product with its dummy description. Great product eh.',
      price: 15.00,
      categoryId: 1
    });

    await this.productDao.insertProductAsync({
      name: 'Test Product 2',
      description: 'Test product with its dummy description. Great product eh.',
      price: 25.50,
      categoryId: 1
    });

    await this.productDao.insertProductAsync({
      name: 'Test Product 3',
      description: 'Test product with its dummy description. Great product eh.',
      price: 8.00,
      categoryId: 2
    });
  }

  getDatabase() {
    const connection = mysql.createConnection({
      host: Constants.DB_CONN_HOST,
      user: Constants.DB_CONN_USER,
      password: Constants.DB_CONN_PASS,
      database: Constants.DB_NAME
    });

    return {
      query( sql, args ) {
        return util.promisify( connection.query )
          .call( connection, sql, args );
      },
      close() {
        return util.promisify( connection.end ).call( connection );
      }
    };
  }

}

export default Database;
