<template>
  <div class="containers">
    <div class="lesson_header">
      <p>全部科目</p>
     </div>
     <div class="lesson_con">
        <div class="lesson_left">
          <p v-for="(item,idx) in lessonOne" :class="activeClass===idx? 'classOn' :''" :key="idx" @click="changeClass(idx)">{{item.class_name}}</p>
        </div>
       <div class="lesson_right">
          <div class="right_con">
            <div class="head_img" :style="classBac">
              <!--<img :src="lesson_pic" alt="">-->
              <p>全部{{lesson}}课程</p>
            </div>
            <div class="contaner">
              <ul>
                <li v-for="(item,idx) in lessonThree" :key="idx" @click="getLessonDetail(idx)"><router-link  to="/course" class="jump">{{item.threeClass_name}}</router-link></li>
              </ul>
            </div>
          </div>
       </div>
     </div>
    <my-footer/>
  </div>
</template>
<script>
  import MyFooter from '../components/Footer'
  import axios from '../plugins/axios'
  import bus from '../plugins/bus'
  export default {
    data(){
      return{
        activeClass:0,
        lessonOne:'',
        lessonThree:'',
        lesson_img:['../assets/15963587.jpg','../assets/15963588.jpg','../assets/15963589','../assets/15963590','../assets/15963591','../assets/15963592','../assets/15963593','../assets/15963594','../assets/15963595','../assets/15963596','../assets/15963597','../assets/15963598','../assets/15963599','../assets/15963600'],
        lesson_pic: "../assets/15963587",
        classBac:'background :url(img/15963589.jpg)no-repeat center',
        lesson:'艺术'
      }
    },
    components:{
      MyFooter
    },
    mounted(){
      var that = this
      this.lesson_pic = require('../assets/15963588.jpg')
      axios.get('/getClassify').then(res=>{
        that.lessonOne = res.data.result.gradeOne
        that.lessonThree = res.data.result.gradeThree
         console.log(that.lessonOne)
      })
    },
    methods:{
      changeClass:function (e) {
        var that = this
        this.activeClass = e
        this.lesson = this.lessonOne[e].class_name
        // this.lesson_pic  = require(img)
        axios({
          method: 'post',
          url: '/getLessons',
          data: {
            gradeId: that.lessonOne[e].gradeId
          }
        }).then((res) => {
          that.lessonThree = res.data.result.gradeThree
          console.log(res.data)
        })
      },
      getLessonDetail:function (e) {
        var that = this
        axios({
          method: 'post',
          url: '/getLessonDetail',
          data: {
            gradeThreeId: that.lessonThree[e].gradeThreeId
          }
        }).then((res) => {
          bus.$emit('sendLessons',res.data.result.data)
        })
      }
    }
  }
</script>
<style lang="stylus">
  .containers
    width 100%
    overflow hidden
    .lesson_header
      width 100%
      height 50px
      text-align center
      line-height 50px
      position fixed
      border-bottom 1px solid #eee
      z-index 9999999
    .lesson_con
      width 100%
      position fixed
      margin-top 50px
      .lesson_left
        height 600px
        width 25vw
        float left
        p
          height 40px
          width 24vw
          text-align center
          line-height 40px
          background #f0f0f0
          color #474747
          font-size 13px
      .lesson_right
        height 845px
        width 75vw

        float right
        .right_con
          width 95%
          margin 0 auto
          height 800px
         .head_img
          width 100%
          height 70px
          /*background url(../assets/15963587.jpg)no-repeat center*/
          margin-top 15px
          position relative
          p
            position absolute
            width 100%
            height 70px
            text-align center
            font-size 18px
            line-height 70px
            color #fff
            font-weight bold
         .contaner
          width 100%
          height 780px
          overflow scroll
          margin-top 10px
          ul
            width 95%
            margin 0 auto
            height  1600px
            border-left 1px solid #eee
            border-top 1px solid #eee
            padding-left 0
            li
              list-style-type none
              height 50px
              width 33.3%
              float left
              border-bottom 1px solid #eee
              border-right 1px solid #eee
              .jump
                display inline-block
                height 50px
                width 100%
                text-align center
                line-height 50px

                font-size 13px
                color #474747
.classOn
  border-left #ef4040 2px solid
  background #fff !important
</style>
