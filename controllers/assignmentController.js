// controllers/assignmentController.js

const { Op } = require('sequelize');
const Assignment = require('../models/assignment');
const User = require('../models/user')
const basicAuth = require('basic-auth');

exports.createAssignment = async (req, res) => {
    try {
      const { name, description, points,num_of_attemps } = req.body;
      const userEmail = basicAuth(req).name;
  
      // Find the user by email
      const user = await User.findOne({
        where: {
          email: userEmail,
        },
      });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const assignment = await Assignment.create({
        name,
        description,
        points,
        UserId: user.id,
        num_of_attemps
      });
  
      res.status(201).json(assignment);
    } catch (error) {
      console.error('Error creating assignment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  exports.updateAssignment = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, points,num_of_attemps } = req.body;
  
      const user = req.user; // Use the authenticated user from the request
  
      // Check if the assignment belongs to the user
      const assignment = await Assignment.findByPk(id);
  
      if (!assignment || assignment.UserId !== user.id) {
        return res.status(403).json({ error: 'Permission Denied' });
      }
  
      const [updatedRowsCount, updatedAssignments] = await Assignment.update(
        {
          name,
          description,
          points,
          UserId: user.id,
          num_of_attemps
        },
        {
          where: {
            id: id,
          },
          returning: true,
        }
      );
  
      if (updatedRowsCount === 0) {
        return res.status(403).json({ error: 'Permission Denied' });
      }
  
      res.json(updatedAssignments[0]);
    } catch (error) {
      console.error('Error updating assignment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  exports.deleteAssignment = async (req, res) => {
    try {
      const { id } = req.params;
  
      const user = req.user; // Use the authenticated user from the request
  
      // Check if the assignment belongs to the user
      const assignment = await Assignment.findByPk(id);
  
      if (!assignment || assignment.UserId !== user.id) {
        return res.status(403).json({ error: 'Permission Denied' });
      }
  
      const deletedRowsCount = await Assignment.destroy({
        where: {
          id: id,
          UserId: user.id,
        },
      });
  
      if (deletedRowsCount === 0) {
        return res.status(403).json({ error: 'Permission Denied' });
      }
  
      res.status(204).send();
    } catch (error) {
      console.error('Error deleting assignment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  