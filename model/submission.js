const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Assignment = require('./assignment');

const Submission = sequelize.define('submission', {
    id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV4, 
        allowNull: false,
    },
    assignment_id: {
        type: Sequelize.DataTypes.UUID,
        references: {
            model: Assignment,
            key: 'id',
        }
    },
    submission_url: {
        type: Sequelize.DataTypes.STRING,
    },
    
}, {
    timestamps: true
});

Submission.belongsTo(Assignment, { foreignKey: 'assignment_id' }); 

module.exports = Submission;
