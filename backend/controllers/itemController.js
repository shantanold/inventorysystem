const Item = require('../models/itemModel')
const mongoose = require('mongoose')

//get all items
const getItems = async(req,res)=>{
    const items = await Item.find({}).sort({createdAt:-1})
    res.status(200).json(items)
}
//get a single item
const getItem = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such item"})
    }
    const item = await Item.findById(id)

    if(!item){

        return res.status(404).json({error:"No such item "})
    
    }

    res.status(200).json(item)
}
//create a new item
const createItem = async(req,res) => {
    const {desc,location, pic, room, duration}=req.body

    //add doc to db
    try{
        const item = await Item.create({desc,location, pic, room, duration})
        res.status(200).json(item)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}
//delete a item
const deleteItem = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such workout gangy"})

    }
    const item = await Item.findOneAndDelete({_id:id})
    if(!item){
        return res.status(404).json({error:"No such item "})
    }

    res.status(200).json(item)
}

//update an item
const updateItem = async(req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:"No such workout gangy"})
    }
    const item = await Item.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if(!item){
        return res.status(404).json({error:"No such item "})
    }
    res.status(200).json(item)

}

module.exports = {
    createItem,
    getItems,
    getItem,
    deleteItem,
    updateItem
}
