
const Assignment = require('../model/assignment');
const Submission = require('../model/submission');
const basicAuth = require('basic-auth');
const bcrypt = require('bcryptjs');
const db = require('../config/database');
const User = require('../model/user');
const base64 = require('base-64');

const logger = require('../logger'); 
const StatsD = require('node-statsd');
const stats = new StatsD();

  
module.exports = {
    checkDb: (req, res,next) => {
        db.authenticate()
          .then(() => { 
              next()
            })

          .catch(err => {
            
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('X-Content-Type-Options', 'nosniff');
            res.status(503).send();
          });
      
      
      },

    
    createAssignment: async (req, res) => {
        const { name, points, num_of_attemps, deadline } = req.body;
        
     const userId=req.currentUser.id;
     stats.increment('post');
     if (!name || !points || !num_of_attemps || !deadline) {
        //stats.increment('bad_request');
        logger.warn(`400 Bad request`);
        return res.status(400).json({error: 'Body required for POST endpoint'});
    }
        
        if (points < 1 || points > 10 || !Number.isInteger(points)) {
            //stats.increment('bad_request');
            logger.warn(`400 Bad request`);
            return res.status(400).json();
        }
    
        if (num_of_attemps < 1 || num_of_attemps > 3 || !Number.isInteger(num_of_attemps)) {
            //stats.increment('bad_request');
            logger.warn(`400 Bad request`);
            return res.status(400).json();
        }


        try {
            const assignment = await Assignment.create({
                userId,
                name,
                points,
                num_of_attemps,
                deadline,
            });
    
            return res.status(201).json({
                "id": assignment.id,
                "name": assignment.name,
                "points": assignment.points,
                "num_of_attemps": assignment.num_of_attemps,
                "deadline": assignment.deadline,
                "createdAt": assignment.createdAt,
                "updatedAt": assignment.updatedAt
            });
        } catch (error) {
            // Handling  other errors 
            console.error('Error creating assignment:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },

getAssignment: async (req, res) => {
    stats.increment('get');
    if (req.headers['content-length'] > 0) {
        //stats.increment('bad_request');
        logger.warn(`400 Bad request`);
        return res.status(400).json({ error: 'Body not allowed for GET endpoint' });
    }

    const assignmentId = req.params.assignmentId;

    try {
        let results = await Assignment.findOne({ where: { id: assignmentId } });
        if (results == null) {
            //stats.increment('bad_request');
            logger.warn(`404-Not Found`);
            return res.status(404).json({

                message: "Not Found",
            });            
        } else {
            return res.status(200).json({
                "id": results.id,
                "name": results.name,
                "points": results.points,
                "num_of_attemps": results.num_of_attemps,
                "deadline": results.deadline,
                "createdAt": results.createdAt,
                "updatedAt": results.updatedAt,
            });
        }
    } catch (error) {
        console.error('Error fetching assignment:', error);
        //stats.increment('Internal Server Error');
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    }
},

    deleteAssignment: async (req, res) => {
        stats.increment('delete');
        if (req.headers['content-length'] > 0) {
            //stats.increment('bad_request');
            logger.warn(`400 Bad request`);
            return res.status(400).json({ error: 'Body not allowed for DELETE request' });
        }
    
        const assignmentId = req.params.assignmentId;
    
        try {
            
            const assignment = await Assignment.findByPk(assignmentId);
    
            if (!assignment) {
                //stats.increment('Not Found');
                logger.warn(`404 Not Found`);
                return res.status(404).json({                    
                    message: 'Assignment not found.'
                });
            }
    
            if (assignment.userId === req.currentUser.id) {
                
                await Assignment.destroy({ where: { id: assignmentId } });
    
                return res.status(204).send(); 
            } else {
                //stats.increment('403');
                logger.warn(`403 Status code Returned`);
                return res.status(403).send(); 
            }
        } catch (error) {
            console.error('Error deleting assignment:', error);
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    },
    
    
    updateAssignment: async (req, res) => {
        stats.increment('update');
        const { name, points, num_of_attemps, deadline } = req.body;
        const assignmentId = req.params.assignmentId;
    
    
        if (!name || !points || !num_of_attemps || !deadline) {
            //stats.increment('bad_request');
            logger.warn(`400 Bad request`);
            return res.status(400).json({error: 'Body required for PUT endpoint'});
        }
    
        
        if (!Number.isInteger(points) || points < 1 || points > 10 ||
            !Number.isInteger(num_of_attemps) || num_of_attemps < 1 || num_of_attemps > 3) {
                //stats.increment('bad_request');
                logger.warn(`400 Bad request`);
            return res.status(400).json({error: 'Request body validations arent met'});
        }
    
        let info = {
            name: name,
            points: points,
            num_of_attemps: num_of_attemps,
            deadline: deadline,
            updatedAt: new Date().toJSON()
        };
    
        try {
            const assignment = await Assignment.findByPk(assignmentId);
    
            if (!assignment) {
                //stats.increment('not Found');
                logger.warn(`404 Not Found`);
                return res.status(404).json({                    
                    message: 'Assignment not found.'
                });
            }
    
            if (assignment.userId === req.currentUser.id) {
                await Assignment.update(info, { where: { id: assignmentId } });
                const updatedAssignment = await Assignment.findByPk(assignmentId);
                
                return res.status(200).json({
                    id: updatedAssignment.id,
                    name: updatedAssignment.name,
                    points: updatedAssignment.points,
                    num_of_attemps: updatedAssignment.num_of_attemps,
                    deadline: updatedAssignment.deadline,
                    createdAt: updatedAssignment.createdAt,
                    updatedAt: updatedAssignment.updatedAt
                });
            } else {
                return res.status(403).send();
            }
        } catch (error) {
            console.error('Error updating assignment:', error);
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    },


    submitAssignment: async (req, res) => {
    const { submission_url } = req.body;
        
    const assignment_id=req.params;

    stats.increment('post');
     if (!submission_url) {
        //stats.increment('bad_request');
        logger.warn(`400 Bad request`);
        return res.status(400).json({error: 'Submission URL Required'});
    }
        // if (points < 1 || points > 10 || !Number.isInteger(points)) {
        //     stats.increment('bad_request');
        //     logger.warn(`400 Bad request`);
        //     return res.status(400).json();
        // }
    
        // if (num_of_attemps < 1 || num_of_attemps > 3 || !Number.isInteger(num_of_attemps)) {
        //     //stats.increment('bad_request');
        //     logger.warn(`400 Bad request`);
        //     return res.status(400).json();
        // }


        try {
            const submission = await Submission.create({
                assignment_id,
                submission_url,
            });
    
            return res.status(201).json({
                "id": submission.id,
                "assignment_id" : submission.assignment_id,
                "submission_url" : submission.submission_url,
                "submission_date": submission.createdAt,
                "submission_updated": submission.updatedAt
            });
        } catch (error) {
            // Handling  other errors 
            console.error('Error creating assignment:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    },


    getAllAssignments: async (req, res) => {
        stats.increment('get');
        if (req.headers['content-length'] > 0) {
            return res.status(400).json({ error: 'Body not allowed for GET ALL endpoint' });
        }
       
       
       
        try {
            const assignments = await Assignment.findAll();

            if (assignments.length === 0) {
                //stats.increment('Not Found');
                logger.warn(`404 Not Found`);
                return res.status(404).json({
                    message: 'No assignments found.'
                });
            }

            const formattedAssignments = assignments.map(assignment => {
                return {
                    id: assignment.id,
                    name: assignment.name,
                    points: assignment.points,
                    num_of_attemps: assignment.num_of_attemps,
                    deadline: assignment.deadline,
                    createdAt: assignment.createdAt,
                    updatedAt: assignment.updatedAt
                };
            });

            return res.status(200).json(formattedAssignments);
        } catch (error) {
            console.error('Error retrieving assignments:', error);
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    },


    allReq: (req,res) => {
        res.status(405).send();
      },
      BadReq: (req,res) => {
        res.status(400).send();
      },   
};






