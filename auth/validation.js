
const bcrypt = require('bcryptjs');
const User = require('../model/user');
const base64 = require('base-64');
const db =require('../config/database')


module.exports ={



    basicAuth: async (req, res, next) => {
        const authHeader = req.headers.authorization;
    
        // Check if authorization header is missing
        if (!authHeader) {
            return res.status(400).json({ error: 'Missing Basic Auth' });
        }
    
        const authHeaderParts = authHeader.split(' ');
    
        // Check if authorization header is in format base64credentials
        if (authHeaderParts.length !== 2 || authHeaderParts[0].toLowerCase() !== 'basic') {
            return res.status(401).send();
        }
    
        const credentials = Buffer.from(authHeaderParts[1], 'base64').toString('utf-8').split(':');
        const username = credentials[0];
        const password = credentials[1];
    
        try {
            const user = await User.findOne({ where: { email: username } });
    
            if (user && await bcrypt.compare(password, user.password)) {
                req.currentUser = user;
                next();
            } else {
                return res.status(401).send();
            }
        } catch (error) {
            console.error('Error authenticating user:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    

}

