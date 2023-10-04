// app.js or index.js

const express = require('express');
const bodyParser = require('body-parser');
const assignmentRoutes = require('./routes/assignmentRoutes');
const sequelize = require('./config/database');
const loadUsersFromCSV = require('./scripts/bootstrap');
const User = require('./models/user');

const app = express();

app.use(bodyParser.json());

// Sync the models with the database
// Sync the models with the database
sequelize.sync({ force: true })
  .then(async () => {
    console.log('Database synced successfully');
    // Load users from CSV at startup
    await loadUsersFromCSV();

    // Start your application logic here
    app.use('/assignments', assignmentRoutes);

        // Health Check endpoint
        app.get('/healthz', async (req, res) => {
            try {
              // Check if the application can connect to the database
              await sequelize.authenticate();
              res.status(200).json({ status: 'OK', message: 'Database connectivity confirmed' });
            } catch (error) {
              console.error('Error checking health:', error);
              res.status(500).json({ status: 'Error', message: 'Database connectivity failed' });
            }
          });
      
      
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
});
