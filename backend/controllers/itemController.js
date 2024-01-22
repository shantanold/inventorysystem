const Item = require('../models/itemModel')
const mongoose = require('mongoose')

//get all items
const getItems = async(req,res)=>{
    const items = await Item.find({}).sort({createdAt:-1})
    res.status(200).json(items)
}
const getItemsDescriptionSorted = async(req,res)=>{
    const items = await Item.find({}).sort({desc:-1})
    res.status(200).json(items)
}
const getItemsLocationSorted = async(req,res)=>{
    const items = await Item.find({}).sort({location:-1})
    res.status(200).json(items)
}
const getItemsRoomSorted = async(req,res)=>{
    const items = await Item.find({}).sort({room:-1})
    res.status(200).json(items)
}
const getItemsDurationSorted = async(req,res)=>{
    const items = await Item.find({}).sort({duration:-1})
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

    let emptyFields = []
    if(!desc){
        emptyFields.push('Description')
    }
    if(!location){
        emptyFields.push("Location")
    }
    if(!room){
        emptyFields.push("Room")
    }
    if(!duration){
        emptyFields.push("Duration")
    }
    if(emptyFields.length>0){
        return res.status(400).json({error: 'Please fll in all the fields',emptyFields})
    }

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
    updateItem,
    getItemsDescriptionSorted,
    getItemsDurationSorted,
    getItemsLocationSorted,
    getItemsRoomSorted,
}
