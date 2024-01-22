const mongoose = require("mongoose");
const Schema = mongoose.Schema
const userSchema = new Schema({
  email: {
    required: true,
    type: String,
    unique: true,
    trim: true,
  },
  password: {
    required: true,
    type: String,
    minLength: 6,
  },
});

module.exports = mongoose.model('user',userSchema)