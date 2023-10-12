const {sequelize,DataTypes} = require('../database/connection');

console.log(sequelize,"❌❌❌❌❌❌❌❌❌");

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = User;