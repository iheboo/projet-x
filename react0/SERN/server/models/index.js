
const Sequelize = require('sequelize');

const {sequelize} = require('../database/connection');


const Users =require("./User");
const Product = require("./Product");
const Review = require("./Review");

// Define the association
Users.hasMany(Product, {foreignKey: "userId"});
Product.belongsTo(Users, {foreignKey: "userId"});

Product.hasMany(Review, {foreignKey: "ProductId"});
Review.belongsTo(Product, {foreignKey: "ProductId"});





const db = {};


db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.Product = Product
db.Users = Users
db.Review = Review

module.exports = db;
