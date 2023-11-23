const Sequelize = require('sequelize');
const sequelize = require('../config/database');
const Assignment = require('./assignment');

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

            // onUpdate: 'CASCADE',
            // onDelete: 'CASCADE',

        }
    },
    submission_url: {
        type: Sequelize.STRING,
    },
}, {
    timestamps: true
});

Submission.belongsTo(Assignment, { foreignKey: 'assignment_id' }); // Define the association

module.exports = Submission;
