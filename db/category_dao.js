class CategoryDao {

  constructor(database) {
    this.database = database;
  }

  async getCategoriesAsync() {
    const db = this.database();

    try {
      const queryResult = await db.query(`SELECT * FROM category`);

      return queryResult;
    } catch (error) {
      console.log("Error while getting categories from db!");
      throw error;
    } finally {
      db.close();
    }
  }

  async insertCategoryAsync(category) {
    const db = this.database();

    try {
      const queryResult = await db.query(`INSERT INTO category (name) VALUES ('${category.name}')`);
      
      category['id'] = queryResult.insertId;

      return category;
    } catch (error) {
      throw error;
    } finally {
      db.close();
    }
  }

  async updateCategoryAsync(category) {
    const db = this.database();

    try {
      const queryResult = await db.query(`
        UPDATE category
        SET name = '${category.name}'
        WHERE id = ${category.id}`);

      return category;
    } catch (error) {
      throw error;
    } finally {
      db.close();
    }
  }

  async deleteCategoryAsync(id) {
    const db = this.database();

    try {
      // TODO: Implement deletion of products that use this category!

      const queryResult = await db.query(`
        DELETE FROM category
        WHERE id = ${id}`);

      return id;
    } catch (error) {
      throw error;
    } finally {
      db.close();
    }
  }

}

export default CategoryDao;