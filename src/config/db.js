const { Sequelize } = require('sequelize');
const sequelize = require('sequelize');
const db = new Sequelize(
  'prueba', //nombre de la base de datos
  'root', //usuario 
  '', //contraseña
  {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306',
  }  
);
module.exports=db;