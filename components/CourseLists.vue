<template>
  <div class="course_content">
    <router-link to="/coursedetail" >
      <div   v-for="(item,idx) in message" @click="goDetail(idx)" :key="idx" >
        <!--<router-link to="/coursedetail" class="course_lists">-->
        <img :src="'img/'+item.teacher_actor" height="200" width="200"/>
          <h4>{{item.teacherName}}</h4>
        <ul >
          <li>
            <h1>{{item.name}}</h1>
          </li>
          <li>
            <p>{{item.institutionsName}}</p>
          </li>
          <li>
            <span>{{item.open_date.substring(0,10)}}至{{item.end_date.substring(0,10)}}</span>
          </li>
          <li class="price">
            <span><span>强报价</span> <span class="RMB">￥</span>{{item.cost}}</span>
          </li>
          <li class="saled_total">
            <span>已报<span class="saled">{{item.saled}}</span>/{{item.total}}人 <span class="area">{{item.district}}</span></span>
          </li>
          <li class="freeListen">
            <span v-show="item.retreat_rule==1">随时退班</span> <span v-show="item.is_transfer==1">随时插班</span> <span v-show="item.is_audition==1">免费试听</span>
          </li>
        </ul>
      </div>
        </router-link>
    </div>

</template>
<script>
import axios from '../plugins/axios'
import bus from  '../plugins/bus'
export default {
  props:{
    message:''
  },
  data(){
    return{
      lessonDetail:"",
      courseId:''
    }
  },
  mounted(){
  },
  methods:{
    goDetail:function (e) {
      this.lessonDetail = this.message
      let that = this
      this.courseId=that.message[e].courseId
      axios({
          method:'post',
          url:'/getDetail',
          data:{
            courseId:that.courseId
          }
        }).then(res=>{
          bus.$emit('info',res.data.result)
          bus.$emit('lessones',that.lessonDetail)
        })

    }
  }
}
</script>
<style lang="stylus">
  .course_content
    width 96vw
    height 1500px
    background #eee
    margin-top 104px
    margin-left 2vw
    div
      display inline-block
      width 96vw
      height 192px
      margin-top 10px
      position relative
      background  #fff
      h4
        width 19vw
        top 145px
        position absolute
        text-align center
        font-size 14px
        color #fff
        background #ef4040
      img
        width 19vw
        height 150px
        margin-top 12px
        position absolute
      ul
        position absolute
        list-style-type none
        width 77vw
        height 192px
        font-size 13px
        margin-left 19vw
        color #474747
        li
          margin-top 5px
        .freeListen
          margin-top 16px
          span
            background url(../assets/icon_class_clas.png) no-repeat left
            margin-left 5px
            background-size 12px
            padding-left 15px
        h1
          font-size 18px
          margin-top 20px
        .saled_total
          margin-top 10px
          border-bottom 1px solid #ddd
          padding-bottom 5px
          .area
            float right
        .price
          span
            color #ef4040
            font-size 16px
            span
              padding-left 1px
              padding-right 1px
              display inline-block
              border 1px solid #ef4040
              border-radius 50px
              font-size 10px
            .RMB
              border none
        .saled
          color #ef4040
</style>
