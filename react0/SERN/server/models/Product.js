const {sequelize,DataTypes} = require('../database/connection');



const Product = sequelize.define('Product', {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
},
price: {
    type: DataTypes.INTEGER,
},
description: {
    type: DataTypes.STRING,
    allowNull: true,
},
completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
},
});
module.exports = Product;