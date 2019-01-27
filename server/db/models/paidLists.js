const mongoose = require('mongoose')
let paidListsSchema = new mongoose.Schema({
  username: String,
  address: String,
  end_date: String,
  cost: Number,
  open_date: String,
  courseId: Number,
  course_id:Number,
  saled:Number,
  total:Number,
  name:String,
  teacherName:String,
  teacher_actor:String
})
module.exports = mongoose.model('PaidLists',paidListsSchema)
