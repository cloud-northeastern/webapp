// config/database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres', 
  host: 'localhost',
  username: 'aakashrajawat',
  password: 'aakashrajawat',
  database: 'csye6225',
  port: 5432,
});

module.exports = sequelize;
