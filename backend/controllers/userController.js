require('dotenv').config()
const User = require('../models/userModel')
const mongoose = require('mongoose')

//get all items
const getUsers = async(req,res)=>{
    const users = await User.find({}).sort({createdAt:-1})
    res.status(200).json(users)
}
//get a single item
const getUser = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such item"})
    }
    const username = await User.findById(id)

    if(!username){

        return res.status(404).json({error:"No such item "})
    
    }

    res.status(200).json(username)
}
//create a new item
const createUser = async(req,res) => {
    const {email, password}=req.body

    let emptyFields = []
    if(!email){
        emptyFields.push('Email')
    }
    if(!password){
        emptyFields.push("Password")
    }
    if(emptyFields.length>0){
        return res.status(400).json({error: 'Please fll in all the fields',emptyFields})
    }

    //add doc to db
    try{
        const user = await User.create({email, password})
        res.status(200).json(user)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}
//delete a item
const deleteUser = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such workout gangy"})

    }
    const user = await User.findOneAndDelete({_id:id})
    if(!user){
        return res.status(404).json({error:"No such item "})
    }

    res.status(200).json(user)
}

//update an item
const updateUser = async(req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such user gangy"})
    }
    const user = await User.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if(!user){
        return res.status(404).json({error:"No such user "})
    }
    res.status(200).json(user)

}
const checkDocumentExistence = async(criteria) =>{
    
    mongoose.connect(process.env.MONGO_URI)
    try {
        const document = await User.findOne(criteria);
    
        if (document) {
          console.log('Document exists:', document);
          return true//{ success: true, message: 'Document exists', document };
        } else {
          console.log('Document does not exist');
          return false//{ success: false, message: 'Document does not exist' };
        }
      } finally {
        console.log('Connection closed');
      }
  }

const authenticateUser = async(req, res)=>{
    const {email, password} = req.body
    const isValid = await checkDocumentExistence({email:email, password:password})
    console.log("this is isValid: ", isValid)
    if(isValid){
        console.log('yuh its valid indeed!!\n')
        return res.status(200).json({email, password})
    }
    else{
        return res.status(400).json({error:"epic fail!"})
    }
    
    return res.status(200).json({mssg:"successfull call"})
}



module.exports = {
    createUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser,
    authenticateUser
}
