const Sequelize = require('sequelize');
const sequelize = require('../config/database');


const User = sequelize.define('user', {
    id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4, 
        allowNull: false,

    },
    first_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    },
    last_name: { 
        type: Sequelize.DataTypes.STRING,
         allowNull: false
    },
    email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate : {
            isEmail : true,
          },
    },

    password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true

});


module.exports = User;


