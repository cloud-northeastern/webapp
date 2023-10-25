// config/database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres', 
  host: 'localhost',
  username: 'aakashrajawat',
  password: 'aakashrajawat',
  database: 'cloud',
  port: 8080,
});

module.exports = sequelize;
