require('dotenv').config();
const express = require('express');
const csv = require('csv-parser')
const fs =require('fs')
const User=require('./model/user')
const bcrypt=require('bcryptjs')
const Assignment=require('./model/assignment')
const Submission = require('./model/submission');

//entry points 

//Database
const db = require('./config/database.js');

const app = express();
const assignmentRouter=require('./assignments/assignmentrouter');
const healthRouter=require('./healthz/healthrouter');
const { Model } = require('sequelize');


app.use(express.json());

app.use('/v1/assignments',assignmentRouter);
app.use('/healthz',healthRouter);

const PORT = process.env.PORT || process.env.APP_PORT;


app.listen(PORT, console.log('Server started on Port ' + PORT));

//Authenticate the database
db.authenticate()
          .then(() => {
            console.log('Database connected.');
        })
            .catch(err => {
                console.log('Database not connected.' );
            });


User.sync({alter:true}).then((data)=> {

  console.log("Table and model synced successfully!");
  fs.createReadStream('./opt/users.csv')
    .pipe(csv())
    .on('data', async (row) => {
    
      const hashedPassword = await bcrypt.hash(row.password, 10); 
        User.create({
            
            first_name: row.first_name,
            last_name: row.last_name,
            email: row.email,
            password:hashedPassword,
            account_created: new Date(),
            account_updated: new Date(),

             
        })
        .then((user) => {
            console.log('Users inserted');
        })
        .catch((error) => {
            console.error('Error inserting users');
        });
    })
    .on('end', () => {
        console.log('CSV file successfully processed.');
    });


  })
  .catch((err) => {
  
  console.log("Error syncing the table and model!");
  
  
  });

Assignment.sync({ alter: true })
    .then(() => {
        console.log('Assignment model synced successfully!');
    })
    .catch((error) => {
        console.error('Error syncing Assignment model');
    });

Submission.sync({ alter: true })
    .then(() => {
        console.log('Submission model synced successfully!');
    })
    .catch((error) => {
        console.error('Error syncing Submision model');
    });

module.exports =app