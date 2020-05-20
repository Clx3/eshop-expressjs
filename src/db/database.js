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
    const connection = mysql.createConnection('mysql://c7tsalmi:Rootpass123@mydb.tamk.fi:3306/dbc7tsalmi1');

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
