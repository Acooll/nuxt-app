const express = require('express')
const Admin = require('../../db/models/admin')
const ShopCars = require('../../db/models/shopCars')
const OrderLists = require('../../db/models/orderLists')
const PaidLists = require('../../db/models/paidLists')
const axios = require('axios')


let router = express.Router()
//登录注册
router.use('/admin', async (req,res)=> {
  let user = await Admin.find({username: req.body.username}, (err, data) => {
    if (data.length){
      if (data[0].password === req.body.password) {
        req.session.username = req.body.username
        res.json({
          status: true,
          result: '登录成功',
        })
      } else {
        res.json({
          status: false,
          result: '密码错误'
        })
      }
    }
  })
  if (!user.length) {
    let nuser = new Admin({
      username: req.body.username,
      password: req.body.password,
      money:10000
    })
    nuser.save()
    req.session.username = req.body.username
    res.json({
      status: true,
      result: '注册成功',
      msg:req.session.username
    })
  }
})
//登录信息
  router.use('/userInfo',async (req,res)=>{
    if(req.session.username){
    await  Admin.find({username: req.session.username}, (err, data) => {
        money= data[0].money
      })
      if(money) {
        res.json({
          status: true,
          result: req.session.username,
          msg: money
        })
      }
    }else{
      res.json({
        status:false,
      })
    }
  })
//立即报名
  router.use('/goImit',async (req,res)=>{
    let username = req.session.username
    let teacher = req.body.carInfo.teacherName
    let cost = req.body.carInfo.cost
    let address= req.body.carInfo.address
    let total = req.body.carInfo.total
    let saled = req.body.carInfo.saled
    let open_date = req.body.carInfo.open_date
    let end_date = req.body.carInfo.end_date
    let courseId = req.body.carInfo.courseId
    let course_id = req.body.carInfo.course_id
    let name = req.body.carInfo.name
    let teacher_actor = req.body.carInfo.teacher_actor
    await OrderLists({username:username,cost:cost,teacherName:teacher,address:address,total:total,saled:saled,open_date:open_date,end_date:end_date,courseId:courseId,course_id:course_id,name:name,teacher_actor:teacher_actor}).save()
    res.json({
      status:true,
    })
  })

//加入购物车
  router.use('/getCars',async (req,res)=>{
    let username = req.session.username
    let teacher = req.body.carInfo.teacherName
    let cost = req.body.carInfo.cost
    let address= req.body.carInfo.address
    let total = req.body.carInfo.total
    let saled = req.body.carInfo.saled
    let open_date = req.body.carInfo.open_date
    let end_date = req.body.carInfo.end_date
    let courseId = req.body.carInfo.courseId
    let course_id = req.body.carInfo.course_id
    let name = req.body.carInfo.name
    let teacher_actor = req.body.carInfo.teacher_actor
    let nshopcars = ShopCars({username:username,cost:cost,teacherName:teacher,address:address,total:total,saled:saled,open_date:open_date,end_date:end_date,courseId:courseId,course_id:course_id,name:name,teacher_actor:teacher_actor})
    await nshopcars.save()
    res.json({
      status:true,
    })
  })

//购物车info
  router.use('/carLists',async (req,res)=>{
    await ShopCars.find({username:req.session.username},(err,data)=>{
      carInfo = data
    })
      res.json({
        status:true,
        result:carInfo
      })
  })
//删除购物车
  router.use('/deleteCars',async (req,res)=>{
     let  courseId = req.body.courseId
      for(let i=0;i<courseId.length;i++){
        // console.log(courseId)
       await ShopCars.remove({courseId:courseId[i]},(err)=>{
          if(err){
            console.log(err)
          }
       })
      }
    res.json({
      status:true,
      result:'ok'
    })
  })
//提交订单
  router.use('/submitCars',async (req,res)=>{
    let  courseId = req.body.courseId
    for(let i=0;i<courseId.length;i++){
      await ShopCars.find({courseId:courseId[i]},(err,res)=>{
        if(err){
          console.log(err)
        }else{
        for(let a=0;a<res.length;a++) {
          OrderLists({
            username: res[a].username,
            cost: res[a].cost,
            teacherName: res[a].teacherName,
            address: res[a].address,
            total: res[a].total,
            saled: res[a].saled,
            open_date: res[a].open_date,
            end_date: res[a].end_date,
            courseId: res[a].courseId,
            course_id: res[a].course_id,
            name: res[a].name,
            teacher_actor: res[a].teacher_actor
          }).save()
        }
      }
      })
    }
    res.json({
      status:true,
      result:'ok'
    })
  })
//待付款订单
  router.use('/listsInfo',async (req,res)=>{
    await OrderLists.find({username:req.session.username},(err,data)=>{
      listsInfo = data
    })
    if(listsInfo) {
      res.json({
        status: true,
        result: listsInfo
      })
    }
  })
//充值
router.use('/addMoney',async (req,res)=> {
  await Admin.update({username: req.session.username}, {money: req.body.money}, (err, data) => {

  })
  res.json({
    status:true
  })

})
//付款成功
  router.use('/submitPay',async (req,res)=>{
    await Admin.update({username:req.session.username},{money:req.body.money},(err,data)=>{

    })
    for(let i=0;i<req.body.courseId.length;i++) {
      await OrderLists.find({courseId:req.body.courseId[i]},(err,res)=>{
        if(res.length) {
          for (let a = 0; a < res.length; a++) {
            PaidLists({
              username: res[a].username,
              cost: res[a].cost,
              teacherName: res[a].teacherName,
              address: res[a].address,
              total: res[a].total,
              saled: res[a].saled,
              open_date: res[a].open_date,
              end_date: res[a].end_date,
              courseId: res[a].courseId,
              course_id: res[a].course_id,
              name: res[a].name,
              teacher_actor: res[a].teacher_actor
            }).save()
          }
        }
      })
     await OrderLists.remove({courseId:req.body.courseId[i]},(err)=>{
      if(err){
        console.log(err)
      }
     })
    }

      res.json({
        status: true,
      })

  })
//已付订单
  router.use('/paidInfo',async (req,res)=>{
    await PaidLists.find({username:req.session.username},(err,data)=>{
     paidInfo = data
    })
    if(paidInfo) {
      res.json({
        status: true,
        result: paidInfo
      })
    }
  })
//删除订单
  router.use('/dropOrder',async (req,res)=>{
    await OrderLists.remove({courseId:req.body.courseId},(err,data)=>{

    })

      res.json({
        status: true,
      })

  })
module.exports = router
