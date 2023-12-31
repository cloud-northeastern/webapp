const Sequelize = require('sequelize');
module.exports= new Sequelize(process.env.DB_POSTGRES,process.env.DB_USER,process.env.DB_PASSWORD,{
logging: false,
host: process.env.DB_HOST,
port: process.env.DB_PORT,
dialect: process.env.DB_DIALECT,

dialectOptions: {
    ssl: {
      require: true, 
      rejectUnauthorized: false 
    }
  },

});