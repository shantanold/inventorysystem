const mongoose = require('mongoose')

const Schema = mongoose.Schema

const itemSchema = new Schema({
    desc:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    pic:{
        type:String,
        required:false
    },
    room:{
        type:String,
        required:true
    },
    duration:{
        type: Number,
        required:true
    }



}, { timestamps: true })

module.exports = mongoose.model('furnitureItem',itemSchema)

