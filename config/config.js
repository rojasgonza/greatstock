const {Sequelize} = require('sequelize');
require('dotenv').config({path: '.env'})


const db = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD,{
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port:'3306'
});
module.exports = db;