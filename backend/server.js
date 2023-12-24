require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const furnitureRoutes = require('./routes/furniture')

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

//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT, ()=>{
        console.log("connected to DB, listening on port 4000")
    })
    
})
.catch((error)=>{
    console.log(error)
})
//listen for requests

process.env