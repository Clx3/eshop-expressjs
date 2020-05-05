import mysql from 'mysql';

class ProductDao {

  constructor(database) {
    this.database = database;
  }

  async getProductsAsync() {
    const db = this.database();

    try {
      const products = await db.query( 'SELECT * FROM product');
  
      return products;
    } catch (error) {
      throw error;
    } finally {
      db.close();
    }
  }

  async getProductByIdAsync(id) {
    const db = this.database();

    try {
      const queryResult = await db.query(`SELECT * FROM product WHERE id = ${id}`);

      if (queryResult.length > 0) {
        return queryResult[0];
      }
    } catch (error) {
      throw error;
    } finally {
      db.close();
    }
  }

  async getProductsByCategoryNameAsync(categoryName) {
    const db = this.database();

    try {

    } catch (error) {
      throw error;
    } finally {
      db.close();
    }
  }

  async insertProductAsync(product) {
    const db = this.database();

    try {
      const queryResult = await db.query(
        `INSERT INTO product (name, description, price, categoryId) VALUES ('${product.name}', '${product.description}', '${product.price}', '${product.categoryId}')`);

      const insertedProduct = {
        id: queryResult.insertId,
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: product.categoryId
      }

      return insertedProduct;
    } catch (error) {
      throw error;
    } finally {
      db.close();
    }
  }
}

export default ProductDao;