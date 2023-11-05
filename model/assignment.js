const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Assignment = sequelize.define('assignment', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4, 
        allowNull: false,
    },
    userId: {
        type: Sequelize.UUID,
        references: {
            model: User,
            key: 'id',
        }
    },
    name: {
        type: Sequelize.STRING,
    },
    points: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 10
        }
    },
    num_of_attemps: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 3
        }
    },
    deadline: {
        type: Sequelize.DATE,
        allowNull: false,
    },
}, {
    timestamps: true
});

Assignment.belongsTo(User, { foreignKey: 'userId' }); // Define the association

module.exports = Assignment;
