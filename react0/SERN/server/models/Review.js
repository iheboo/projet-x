const {sequelize,DataTypes} = require('../database/connection');

const Review = sequelize.define('Review',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      rating: {
        type: DataTypes.INTEGER,
      },
      description: {
        type: DataTypes.STRING,
      }
});
module.exports = Review;