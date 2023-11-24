const { createAssignment, deleteAssignment,updateAssignment,getAllAssignments, getAssignment,checkDb, allReq, BadReq} = require('./assignmentcontroller')
const {basicAuth}= require('../auth/validation.js')
const router = require('express').Router();

router.post('/',checkDb, basicAuth, createAssignment);
router.post('/:assignmentId/submission',checkDb, basicAuth, submitAssignment)
router.get('/',checkDb,  basicAuth, getAllAssignments);
router.get('/:assignmentId',checkDb,  basicAuth, getAssignment);
router.delete('/:assignmentId',checkDb,  basicAuth,deleteAssignment );
router.delete('/',BadReq);
router.put('/:assignmentId', checkDb, basicAuth, updateAssignment );
router.put('/', BadReq);
router.patch('/*',allReq)
module.exports=router;

