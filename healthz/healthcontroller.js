const db = require('../config/database');


module.exports = {
    checkHealth: (req, res) => {
        //Test DB
        db.authenticate()
          .then(() => {
            


          
              if (Object.keys(req.query).length > 0 || req.headers['content-length'] > 0) {
            
                res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
                res.setHeader('Pragma', 'no-cache');
                res.setHeader('X-Content-Type-Options', 'nosniff');
                res.status(400).send();
              } else {
              

            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('X-Content-Type-Options', 'nosniff');
            res.status(200).send('')
      
              }
            })

          .catch(err => {
            
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('X-Content-Type-Options', 'nosniff');
            res.status(503).send();
          });
      
      
      },


allHealth: (req,res) => {

    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.status(405).send();

}

}

    