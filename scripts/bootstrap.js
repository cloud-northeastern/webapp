const fs = require('fs');
const csv = require('csv-parser');
const User = require('../models/user');

const csvFilePath = './opt/user.csv';

const loadUsersFromCSV = async () => {
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', async (row) => {
      try {
        const [user, created] = await User.findOrCreate({
          where: { email: row.email },
          defaults: {
            firstName: row.first_name,
            lastName: row.last_name,
            email: row.email,
            password: row.password,
          },
        });

        if (!created) {
          // User already exists, no action required
          console.log(`User with email ${row.email} already exists. Skipping.`);
        } else {
          console.log(`User with email ${row.email} created successfully.`);
        }
      } catch (error) {
        console.error(`Error creating user for email ${row.email}:`, error.message);
      }
    })
    .on('end', () => {
      console.log('CSV file successfully processed');
    });
};

module.exports = loadUsersFromCSV;
