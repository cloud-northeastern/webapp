const Sequelize = require('sequelize');
const sequelize = require('../config/database');
//const User = require('./user');
const assignment = require('./assignment');

const Submission = sequelize.define('submission', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4, 
        allowNull: false,
    },
    assignment_id: {
        type: Sequelize.UUID,
        references: {
            model: assignment,
            key: 'id',
        }
    },
    submission_url: {
        type: Sequelize.STRING,
    },
}, {
    timestamps: true
});

Submission.belongsTo(assignment, { foreignKey: 'assignment_id' }); // Define the association

module.exports = Submission;
