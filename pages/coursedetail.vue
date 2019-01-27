<template>
  <div class="content">
    <div class="bac_img">
      <p>
        <nuxt-link to="/course"  class="back"><img src="../assets/icon_back_page.png" height="30" width="30" @click="backCourse" /></nuxt-link>
        <a href="" class="phone"><img src="../assets/icon_phone.png" height="30" width="30" /></a>
        <a href=""  class="more"><img src="../assets/icon_more.png" height="30" width="30"/></a>
      </p>
      <div class="bottom">
        <p>已报{{lessones.saled}}/{{lessones.total}}人</p>
      </div>
    </div>
    <div class="c_detail">
      <p>{{lessones.name}}</p>
      <p style="color: #ef4040">￥{{lessones.cost}}</p>
      <p><img src="../assets/icon_class_clas.png" alt="" style="width: 15px" >随时退班</p>
      <p class="discount"> {{lessones.end_date1}} {{lessones.class_time_names}}前报名，享9.8折优惠</p>
    </div>
    <div class="detail_content">
      <p>课程概述</p>
      <ul>
        <span>所属校区</span>
        <li>
          {{lessones.campusesName}}
        </li>
         <span>适学人群</span>
        <li>{{lessones.person}}</li>
        <span>教学目标</span>
        <li>{{lessones.teachingTarget}}</li>
        <span>教学亮点</span>
        <li>{{lessones.couresStar}}</li>
      </ul>
    </div>
    <div class="course_info">
      <h4>课程信息</h4>
      <div class="info_content">
        <p>主讲老师 : {{lessones.teacherName}}</p>
        <p>课程安排 : {{lessones.open_date}}至{{lessones.end_date}}</p>
        <p>上课地点 : 北京市海淀区西北旺中关村科技园1</p>
      </div>
    </div>
    <div class="family">
      <div>
        <h4>家长评价</h4>
        <p class="goal">4.5分 <span>共10条评价</span> </p>
      </div>
      <ul>
        <li style="font-size: 14px;color:#666">
          <p ><img src="../assets/head_portrait.png" height="25" width="25"/>匿名<span>20170501</span></p>
          {{content1}}
        </li>
        <li style="font-size: 14px;color:#666">
          <p style="font-size: 14px"><img src="../assets/head_portrait.png" height="25" width="25"/>匿名<span>20170501</span></p>
          {{content2}}
        </li>
      </ul>
      <div class="comments">查看全部评论</div>
    </div>
    <div class="footer">
      <li class="prelisten">预约试听</li>
      <li class="cart" @click="getCar"  ref="car">加入购物车</li>
      <li class="goPay" @click="gotoPay">立即报名</li>
    </div>
  </div>
</template>
<script>
import bus from '../plugins/bus'
import axios from '../plugins/axios'
  export default {
    data(){
      return{
        lessonDetail:'',
        lessones:'',
        cart:true,
        lessonLists:"",
        content1:'',
        content2:'',
        courseId:[],
        username:''

      }
    },
    mounted(){
      let that = this
      bus.$on('info',function (res) {
        that.lessones = res
        that.content1=res.evaluate[0]
        that.content2=res.evaluate[1]
        console.log(res)
      })
      bus.$on('lessones',(res)=>{
        that.lessonLists = res
        console.log(res)
      })
      axios.get('/userInfo').then(res=>{
        if(res.data.result){
          that.username = res.data.result

        }
        console.log(res.data.result)
      })
    },
    methods:{
      getCar:function () {
        let that = this
        if (this.cart) {
          if (this.username) {
            axios({
              method: 'post',
              url: '/getCars',
              data: {
                carInfo: that.lessones
              }
            }).then(res => {
              that.cart = false
              that.$refs.car.classList.add('carClass')
            })
          }else{
            location.href='/login'
          }
        }
      },
      backCourse:function () {
        bus.$emit('sendLessons',this.lessonLists)
      },
      gotoPay:function () {
        this.courseId.push(this.lessones.courseId)
        let that = this
        if (this.username) {
          axios({
            method: 'post',
            url: 'goImit',
            data: {
              carInfo: that.lessones
            }
          }).then(this.$router.push({
            path: 'payOrder',
            query: {totalCost: that.lessones.cost, courseId: that.courseId}
          }))
        }else{
          location.href='/login'
        }
      }
    }
  }
</script>
<style lang="stylus">
.content
  width 100%
  /*height 1370px*/
  background #eee
  .bac_img
    width 100%
    height 62.5vw
    background url(../assets/header_pic.jpg) no-repeat
    background-size 100%
    position relative
    overflow hidden
    p
      width 100%
      height 40px
      position absolute
      a
        display inline-block
        height 40px
        margin-top 15px
      .back
        margin-left 20px
      .more
        float right
        margin-right -75px
      .phone
        float right
        margin-right 60px
    .bottom
      width 100%
      height 35px
      margin-top 57vw
      background url(../assets/opa_jx.png)no-repeat
      background-size 100%
      p
        width 100%
        height 20px
        line-height 20px
        color #fff
  .c_detail
    width 100%
    height 149px
    font-size 14px
    color #666
    background #fff
    p
      width 100%
      height 35px
      padding-left 25px
      line-height 35px
    .discount
      padding-top 5px
      border-top 1px solid #ddd
  .detail_content
    width 100%
    height 288px
    background #fff
    margin-top 10px
    overflow hidden
    p
      font-weight bold
      font-size 14px
      color #474747
      margin 0 auto
      height 15px
      width 95%
      border-left 2px solid #ef4040
      padding-left 15px
      margin-top 15px
    ul
      width 100%
      height 245px
      border-top 1px solid #ddd
      margin 25px auto
      padding-top 15px
      span
        width 100%
        color orange
        font-size 14px
        margin-top 15px
        margin-left -15px
      li
        width 100%
        font-size 14px
        color black
        margin-top 10px

  .course_info
    width 100%
    height 200px
    margin-top 10px
    background #fff
    overflow hidden
    h4
      font-size 14px
      color #474747
      margin 0 auto
      height 15px
      width 95%
      border-left 2px solid #ef4040
      padding-left 15px
      margin-top 15px

    p
      width 100%
      font-size 14px
      margin-left 15px
      margin-top 20px
    .info_content
      width 100%
      height 100px
  .family
    width 100%
    height 306px
    background #fff
    margin-top 10px
    overflow hidden
    h4
      font-size 14px
      color #474747
      margin 0 auto
      height 15px
      width 95%
      border-left 2px solid #ef4040
      padding-left 15px
      margin-top 15px
    p
      margin-top 10px
      padding-left 15px
      padding-right 15px
      font-size 17px
      color orange
      font-weight bold
      span
        float right
        color #222
        font-size 14px
        font-weight normal
    ul
      width 100%
      height 120px
      border-top 1px solid #eee
      margin-top 10px
      li
        width 100%
        list-style-type none
        height 50px
        border-bottom 1px solid #eee
    .comments
      width 100%
      height 30px
      line-height 30px
      color #ef4040
      font-weight bold
      font-size 15px
      text-align center
      margin-top 10px
.footer
  width 100%
  height 50px
  bottom 0
  position fixed
  li
    list-style-type none
    width 33.3%
    height 50px
    text-align center
    line-height 50px
    float left
  .prelisten
    background #fff
    color #ef4040
  .cart
    background orange
    color #fff
  .goPay
    background #ef4040
    color #fff
  .carClass
    background #7f828b !important
</style>
