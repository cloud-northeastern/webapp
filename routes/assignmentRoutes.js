// routes/assignmentRoutes.js

const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');
const basicAuth = require('basic-auth');
const User = require('../models/user');

const isAuthenticated = async (req, res, next) => {
  const credentials = basicAuth(req);

  if (!credentials || !credentials.name || !credentials.pass) {
    return res.status(401).json({ error: 'Unauthorized - Missing credentials' });
  }

  try {
    const user = await User.findOne({
      where: {
        email: credentials.name,
      },
    });

    if (!user || !(await user.isValidPassword(credentials.pass))) {
      return res.status(401).json({ error: 'Unauthorized - Invalid credentials' });
    }

    // Attach user information to the request
    req.user = user;

    next();
  } catch (error) {
    console.error('Error authenticating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


router.post('/', isAuthenticated, assignmentController.createAssignment);
router.put('/:id', isAuthenticated, assignmentController.updateAssignment);
router.delete('/:id', isAuthenticated, assignmentController.deleteAssignment);

module.exports = router;
