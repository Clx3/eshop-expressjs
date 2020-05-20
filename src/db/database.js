import mysql from 'mysql';
import util from 'util';

import { Constants } from '../constants';
import ProductDao from './product_dao';
import CategoryDao from './category_dao';
import RatingDao from './rating_dao';

class Database {

  constructor() {
    this.categoryDao = new CategoryDao(this.getDatabase);
    this.productDao = new ProductDao(this.getDatabase);
    this.ratingDao = new RatingDao(this.getDatabase); 
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
