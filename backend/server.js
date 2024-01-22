require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const furnitureRoutes = require('./routes/furniture')
const userRoutes = require('./routes/users')
const User = require('./models/userModel')
//creates express app
const app = express()
//middleware to parse json files
app.use(express.json())
//middleware to log out incoming requests
app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})
//routes
app.use('/api/furniture',furnitureRoutes)
app.use('/api/users', userRoutes)
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