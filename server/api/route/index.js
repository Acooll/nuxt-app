const express = require('express')
const axios = require('axios')


  let router = express.Router()
  //classify
  router.use('/getClassify', async (req,res,next)=>{
    await axios.get('http://nodet.cn/api/listhome').then((res)=>{
      classify = res.data
    })

    if(classify){
      res.json({
        status:true,
        result:classify
      })
    }
  })
//getLessons
  router.use('/getLessons', async (req,res)=>{
    await axios.get('http://nodet.cn/api/listhome/'+req.body.gradeId).then((res)=>{
      lessons = res.data
    })
    if(lessons){
      res.json({
        status:true,
        result:lessons
      })
    }
  })
//getLessonDetail
  router.use('/getLessonDetail', async (req,res)=>{
    await axios.get('http://nodet.cn/api/courselist?offset=0&limit=15&type=3&sort=1&courseId='+req.body.gradeThreeId+'&selectScreenStr=').then((res)=>{
      lessonDetail = res.data
    })
    if(lessonDetail){
      res.json({
        status:true,
        result:lessonDetail
      })
    }
  })

//getDetail
  router.use('/getDetail', async (req,res)=>{
    await axios.get('http://nodet.cn/api/courseDetail/index/'+req.body.courseId).then((res)=>{
      detail = res.data
    })
    if(detail){
      res.json({
        status:true,
        result:detail
      })
    }
  })

//
  router.use('/search',async (req,res,next)=>{
    let parmas = encodeURI(req.body.searchWords)
   await  axios.get('http://nodet.cn/api/getleckCourse?limit=15&offset=0&name='+parmas).then((res)=>{
        data = res.data

    })
    if(data) {
      res.json({
        status: true,
        result: data
      })
    }
   next()
  })

module.exports = router
