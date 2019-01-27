<template>
  <div class="containers">
    <div class="car_header">
     <p>购物车</p>
      <span @click="editor" v-show="!editorWords">编辑</span>
      <span @click="editor" v-show="editorWords">完成</span>
    </div>
    <div class="no_cars" v-show="noCars">
      <img src="../assets/no_content_menu.png" alt="">
      <p>购物车为空，快去<a href="/classify">选课</a>吧！</p>
    </div>
    <div class="courseLists" v-show="!noCars">
      <!--<router-link to="/coursedetail" >-->
        <div class="content"  v-for="(item,idx) in carLists"  :key="idx" >
          <div @click="selectOrNot(item,idx)" class="areas" :class="{'active':item.active}" ref="addClass" ><span>{{item.address}}</span></div>
          <!--<router-link to="/coursedetail" class="course_lists">-->
          <img :src="'img/'+item.teacher_actor" height="200" width="200"/>
          <h4>{{item.teacherName}}</h4>
          <ul >
            <li>
              <h1>{{item.name}}</h1>
            </li>

            <li class="school_img">{{item.address}}</li>
            <li class="time_img">
              <span>{{item.open_date}}至{{item.end_date}}</span>
            </li>
            <li class="price">
              <span><span>强报价</span> <span class="RMB">￥</span>{{item.cost}}</span>
            </li>
            <li class="saled_total">
              <span>已报<span class="saled">{{item.saled}}</span>/{{item.total}}人 <span class="area">{{item.district}}</span></span>
            </li>
            <!--<li class="freeListen">-->
              <!--<span v-show="item.retreat_rule==1">随时退班</span> <span v-show="item.is_transfer==1">随时插班</span> <span v-show="item.is_audition==1">免费试听</span>-->
            <!--</li>-->
          </ul>
        </div>
      <!--</router-link>-->
    </div>
      <div class="computed">
        <div class="left_select">
          <a href="#" @click="allChoose">
            <img src="../assets/select_not.png" height="36" width="36" v-show="!chooseAll"/><span v-show="!chooseAll">全选</span>
            <img src="../assets/icon_red_ok.png" height="40" width="40" v-show="chooseAll"/><span v-show="chooseAll">全选</span>
          </a>
          <div class="total" v-show="!editorClass">
            <p>合计 :<span>￥{{totalCost}}</span></p>
            <p class="book_money">不含教程费</p>
          </div>
        </div>
        <!--<router-link to="/payOrder" >-->
          <div  type="button" class="settlement" v-show="!editorClass" @click="submitOrder">
          <!--<router-link to="/payOrder">-->
          <span>马上结算</span>
          <!--</router-link>-->
        </div>
        <!--</router-link>-->
        <div type="button" class="settlement" v-show="editorClass" @click="deleteOrder">
          <span>删除</span>
        </div>
      </div>
    <my-footer/>
  </div>
</template>
<script>
  import CourseLists from '../components/CourseLists'
  import MyFooter from '../components/Footer'
  import axios from '../plugins/axios'
  import bus from '../plugins/bus'
  import {mapState,mapMutations} from 'vuex'
  export default {
    data(){
      return{
        carLists:'',
        chooseAll:false,
        allSelect:false,
        editorClass:false,
        editorWords:false,
        orderId:[],
        totalCost:0,
        cost:0,
        noCars:true
      }
    },
    components:{
      MyFooter,
      CourseLists
    },
    mounted(){
      // this.select = this.select_not
      let that = this
      axios.get('/userInfo').then((res)=>{
        if(!res.data.status){
          location.href='/login'
        }else{
          axios.get('/carLists').then(res=>{
            if(res.data.result.length) {
              that.carLists = res.data.result
              that.noCars = false
            }
          })
        }
      })
    },
    methods:{
      selectOrNot:function (item,idx) {
       if(this.$refs.addClass[idx].active){
         this.$refs.addClass[idx].classList.remove('active')
         this.chooseAll = false
         this.$refs.addClass[idx].active = false
         this.orderId.splice(this.orderId.indexOf(this.carLists[idx].courseId),1)
         this.totalCost -= this.carLists[idx].cost
         this.cost = 0
         // console.log(item)
       }else{
        // Vue.set(item,'active',true)
         this.$refs.addClass[idx].classList.add('active')
         this.$refs.addClass[idx].active = true
         this.orderId.push(this.carLists[idx].courseId)
         this.totalCost += this.carLists[idx].cost
       }
      },
      allChoose:function () {
        if(this.chooseAll){
          for(let i=0;i<this.$refs.addClass.length;i++) {
            this.$refs.addClass[i].classList.remove('active')
            this.$refs.addClass[i].active=false
            this.cost = 0
            this.totalCost = 0
          }
          this.chooseAll = false
        }else{
          for(let i=0;i<this.$refs.addClass.length;i++) {
            this.orderId.push(this.carLists[i].courseId)
            this.$refs.addClass[i].classList.add('active')
            this.$refs.addClass[i].active=true
             this.cost += this.carLists[i].cost
            this.totalCost = this.cost
          }
            this.chooseAll=true
        }
      },
      editor:function () {
        console.log(this.orderId)
        this.editorWords = !this.editorWords
        this.editorClass = !this.editorClass
      },
      deleteOrder:function () {
        let that = this
          axios({
            method:'post',
            url:'deleteCars',
            data:{
              courseId:that.orderId
            }
          }).then(res=>{
            if(res.data.result){
              location.href='shoppingCart'
            }
          })
      },
      submitOrder:function () {
        let that = this
        if (this.orderId.length) {
          axios({
            method: 'post',
            url: 'submitCars',
            data: {
              courseId: that.orderId
            }
          }).then(res => {
            // console.log(res)
          }).then(axios({
            method: 'post',
            url: 'deleteCars',
            data: {
              courseId: that.orderId
            }
          }).then(res => {
            if (res.data.result) {
              this.$router.push({path:'payOrder',query:{totalCost:that.totalCost,courseId:that.orderId}})
            }
          }))
        }
      }
    },
    beforeDestroy(){
      bus.$emit('sendCost',this.totalCost)
      // this.$store.commit('changeCost')
    }

  }
</script>
<style lang="stylus">
.containers
  width 100%
  background #ddd
  overflow auto
  margin-bottom 120px
  .car_header
    width 100%
    height 50px
    text-align center
    line-height 50px
    background #fff
    position fixed
    border-bottom 1px solid #ddd
    z-index 9999999
    span
      display inline-block
      position absolute
      top 0
      margin-left 40vw
      font-size 14px
      color #474747
  .computed
    width 100%
    height 50px
    background #fff
    bottom 60px
    position fixed
    z-index 1999999
    border-bottom 1px solid #eee
    .left_select
      width 75vw
      height 50px
      position absolute
      a
        width 100px
        height 50px
        text-align center
        line-height 50px
        padding-left 15px
        img
          width 20px
          height 20px
       span
        font-size 14px
        color #474747
        margin-left 5px
      .total
        width 100px
        height 50px
        float right
        p
          width 90px
          height 20px
          margin-top 10px
          font-size 12px
          margin-left 0
          span
            color #ef4040
            margin-left 10px
        .book_money
          margin-top 2px
          margin-left  2px
    .settlement
      width 25vw
      height 50px
      background #ef4040
      position absolute
      margin-left 75vw
      text-align center
      line-height 50px
      color #fff
      font-size 15px
.courseLists
  width 100%
  margin-top 50px
  .content
    display inline-block
    width 100%
    height 235px
    position relative
    background  #fff
    border-bottom 10px solid #ddd
    .areas
      width 100%
      height 40px
      background url(../assets/select_not.png) #ef4040 no-repeat 10px
      background-size 22px
      color #fff
      font-size 13px
      line-height 40px
      padding-left 10px
      span
        margin-left 40px
    h4
      width 19vw
      top 177px
      position absolute
      text-align center
      font-size 14px
      color #fff
      background #ef4040
      margin-left 15px
    img
      width 19vw
      height 142.5px
      margin-top 12px
      position absolute
      margin-left 15px
    ul
      position absolute
      list-style-type none
      width 77vw
      height 182px
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
.no_cars
  width 100%
  margin-top 50px
  text-align center
  img
    height 200px
  p
    color #666
    font-size 14px
    a
      color #ef4040

.school_img
  background url(../assets/icon_school.png) no-repeat left
  padding-left 15px
  background-size 12px
.time_img
  background url(../assets/icon_clock_.png) no-repeat left
  padding-left 15px
  background-size 12px

.active
  background url(../assets/icon_red_ok.png) #ef4040 no-repeat 10px !important
  /*background  #ef4040 !important*/
  background-size 22px !important

</style>
