import mysql from 'mysql';

class ProductDao {

  constructor(database) {
    this.database = database;
  }

  async getProductsAsync() {
    const db = this.database();

    try {
      const products = await db.query('SELECT * FROM product');
  
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
      const queryResult = await db.query(`
        SELECT * 
        FROM product 
        WHERE id = ${id}`);

      if (queryResult.length > 0) {
        return queryResult[0];
      }
    } catch (error) {
      throw error;
    } finally {
      db.close();
    }
  }

  /**
   * Queries products by given filters object.
   * The given object must contain name and value pairs of wanted
   * filters to be used in the query. Example object:
   * 
   * TODO: Add example object
   * 
   * @param {Object} filters 
   */
  async getProductsByFiltersAsync(filters) {
    const db = this.database();
    let queryString = `SELECT * FROM product `;

    if (filters !== null) {
      queryString += 'WHERE ';

      queryString += `categoryId = IFNULL(${filters.categoryId}, categoryId) `;

      if (filters.searchText && filters.searchText !== '') {
        queryString += `AND name LIKE('%${filters.searchText}%') `;
      }
    }

    console.log(queryString) 

    try {
      const queryResult = await db.query(queryString);

      return queryResult;
    } catch (error) {
      throw error;
    } finally {
      db.close();
    }
  }

  async getProductsByCategoryName(categoryName) {
    const db = this.database();

    try {
      const queryResult = await db.query(
        `SELECT *
        FROM product
        LEFT JOIN category ON category.id=product.categoryId
        WHERE category.name = '${categoryName}'`);
      
      return queryResult;
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
        `INSERT INTO product (name, description, price, categoryId) 
        VALUES (
          '${product.name}', 
          '${product.description}', 
          '${product.price}', 
          '${product.categoryId}')`);

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

  async updateProductAsync(product) {
    const db = this.database();

    try {
      const queryResult = await db.query(
        `UPDATE product 
        SET name = '${product.name}',
        description ='${product.description}',
        price = ${product.price},
        categoryId = ${product.categoryId}
        WHERE id = ${product.id}`);

        return product;
    } catch (error) {
      throw error;
    } finally {
      db.close();
    }
  }

}

export default ProductDao;