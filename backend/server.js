require('dotenv').config()
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import jwt from 'jsonwebtoken';
const mongoose = require('mongoose')
const express = require('express')
const cron = require('node-cron')
const furnitureRoutes = require('./routes/furniture')
const userRoutes = require('./routes/users')
const User = require('./models/userModel')
const Item = require('./models/itemModel')
var session = require('express-session')
//creates express app
const app = express()
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
//middleware to parse json files
app.use(express.json())
//middleware to log out incoming requests
app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // not using HTTPS
}));

//routes
app.use('/api/furniture',furnitureRoutes)
app.use('/api/users', userRoutes)
const requireLogin = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect('/login');
  }
};

// Apply middleware to protected routes
app.get('api/furniture', requireLogin, (req, res) => {
  res.send('database');
});
//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log("connected to DB, listening on port 4000")
    })
    
})
.catch((error)=>{
    console.log(error, "is causing errors!")
})



const updateOperation = {
  $inc: {
    duration:-1,
  }
}

const updateDocuments = async () => {
  try {
    const result = await Item.updateMany({}, updateOperation);
    console.log(`${result.modifiedCount} documents updated at ${new Date()}`);
  } catch (error) {
    console.error('Error updating documents:', error);
  }
};

// Schedule the update daily at midnight
cron.schedule('0 0 * * *', () => {
  console.log('Running Cron Job');
  updateDocuments();
});

//listen for requests
const checkDocumentExistence = async(criteria) =>{
    try {
        const document = await User.findOne(criteria);
    
        if (document) {
          console.log('Document exists:', document);
          return { success: true, message: 'Document exists', document };
        } else {
          console.log('Document does not exist');
          return { success: false, message: 'Document does not exist' };
        }
      } finally {
        mongoose.disconnect();
        console.log('Connection closed');
      }
  }
module.exports = checkDocumentExistence;
process.env