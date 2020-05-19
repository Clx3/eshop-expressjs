class RatingDao {

  constructor(database) {
    this.database = database;
  }

  async getRatingsByProductIdAsync(productId) {
    const db = this.database();

    try {
      const queryResult = await db.query(`
        SELECT * FROM rating
        WHERE productId = ${productId}`);

      return queryResult;
    } catch (error) {
      throw error;
    } finally {
      db.close();
    }
  }

  async insertRatingAsync(rating) {
    const db = this.database();

    try {
      const queryResult = await db.query(`
        INSERT INTO rating
        (productId, username, comment, ratingValue)
        VALUES 
        ${rating.productId},
        '${rating.username}',
        '${rating.comment}',
        ${rating.ratingValue}`);

        const insertedRating = {
          id: queryResult.insertId,
          productId: rating.productId,
          username: rating.username,
          comment: rating.comment,
          ratingValue: rating.ratingValue
        };

        return insertedRating;
    } catch (error) {
      throw error;
    } finally {
      db.close();
    }
  }

}

export default RatingDao;