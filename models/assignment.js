const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Assignment = sequelize.define('Assignment', {
  id: {
    type: DataTypes.INTEGER, // Change the data type to INTEGER
    autoIncrement: true,     // Add auto-increment for INTEGER    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10,
    },
  },
  assignment_created: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
    readOnly: true,
  },
  assignment_updated: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
    readOnly: true,
  },
  UserId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },

});

Assignment.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });

module.exports = Assignment;
