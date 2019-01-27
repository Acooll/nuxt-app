const mongoose = require('mongoose')
let adminSchema = new mongoose.Schema({
  username: {type:String,unique:true},
  password: {type:String},
  money: {type:Number}
})
module.exports = mongoose.model('Admin',adminSchema)
