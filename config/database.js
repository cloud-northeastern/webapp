// // config/database.js

// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize({
//   dialect: 'postgres', 
//   host: 'localhost',
//   username: 'aakashrajawat',
//   password: 'aakashrajawat',
//   database: 'csye6225',
//   port: 5432,
// });

// module.exports = sequelize;

const Sequelize = require('sequelize');
module.exports= new Sequelize(process.env.DB_POSTGRES,process.env.DB_USER,process.env.DB_PASSWORD,{
logging: false,
host: process.env.DB_HOST,
port: process.env.DB_PORT,
dialect: process.env.DB_DIALECT,
operatorsAliases: 0,

pool:{

max:5,
min:0,
acquire: 30000,
idle: 10000


},
});