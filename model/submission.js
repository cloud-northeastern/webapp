const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Assignment = require('./assignment');
const User = require('./user');

const Submission = sequelize.define('submission', {
    id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV4, 
        allowNull: false,
    },
    assignmentId: {
        type: Sequelize.DataTypes.UUID,
        references: {
            model: Assignment,
            key: 'id',
        }
    },
    userId:{
        type: Sequelize.DataTypes.UUID,
        references: {
            model: User,
            key: 'id',
        }
    },
    submission_url: {
        type: Sequelize.DataTypes.STRING,
    },
    
}, {
    timestamps: true
});

Submission.belongsTo(Assignment, { foreignKey: 'assignmentId' }); 
Submission.belongsTo(User, { foreignKey: 'userId' }); 
module.exports = Submission;
