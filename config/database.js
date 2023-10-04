// config/database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres', // or your database dialect
  host: 'localhost',
  username: 'aakashrajawat',
  password: 'aakashrajawat',
  database: 'cloud',
  port: 5000,
});

module.exports = sequelize;
