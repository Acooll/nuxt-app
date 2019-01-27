<template>
  <div class="content">
    <div class="orderHeader">
      <a href="/my"><img src="../assets/icon_back_red.png" alt=""></a>
      我的订单
    </div>
    <div class="nav">
      <li v-for="(item,idx) in words"  @click="changeActive(idx)" :class="activeClass===idx?'activeClass':''">{{item}}</li>
      <!--<li @click="prePay">代付款</li>-->
      <!--<li @click="preComment">待评价</li>-->
    </div>
    <ul class="menu_lists" v-show="prePay">
      <li v-for="(item,idx) in preInfo">
        <p>2019-01-24 <span>待付款</span></p>
        <div class="box">
          <img :src="'img/'+item.teacher_actor" />
          <h3>{{item.teacherName}}</h3>
          <div class="textInfo">
            <p>购买 : {{item.name}}</p>
            <p>地址 : {{item.address}}</p>
            <p>时间 : {{item.open_date}}</p>
            <p>学校 : 华兴学校</p>
          </div>
        </div>
        <h4>合计 : <span>￥{{item.total}}</span></h4>
        <div class="more">
          <span class="order_all" @click="goPay(idx)">支付</span>
          <span class=" no_more" @click="dropOrder(idx)">取消</span>
        </div>
      </li>
    </ul>
    <ul class="menu_lists" v-show="paid">
      <li v-for="item in paidInfo">
        <p>2019-01-24 <span>交易成功</span></p>
        <div class="box">
          <img :src="'img/'+item.teacher_actor" />
          <h3>{{item.teacherName}}</h3>
          <div class="textInfo">
            <p>购买 : {{item.name}}</p>
            <p>地址 : {{item.address}}</p>
            <p>时间 : {{item.open_date}}</p>
            <p>学校 : 华兴学校</p>
          </div>
        </div>
        <h4>合计 : <span>￥{{item.total}}</span></h4>
        <div class="more">
          <span class="order_all">订单详情</span>
          <span class=" no_more">不支持退班</span>
        </div>
      </li>
    </ul>
    <ul v-show="preJudge" class="judge">
         <img src="../assets/no_content_menu.png" alt="">
         <p>没有该订单哦~</p>
    </ul>
    <my-footer></my-footer>
  </div>
</template>
<script>
  import axios from '../plugins/axios'
  import MyFooter from '../components/Footer'
  export default {
    data(){
      return{
        preInfo:'',
        paidInfo:'',
        words:['待付款','已支付','待评价'],
        activeClass:0,
        prePay:true,
        paid:false,
        preJudge:false,
        courseId:[]
      }
    },
    components:{
      MyFooter,
    },
    methods:{
      changeActive:function (idx) {
      let that = this
        this.activeClass = idx
        if(idx===0){
          this.prePay=true;
          this.paid=false;
          this.preJudge=false
        }else if(idx===1){
          axios.get('/paidInfo').then(res=>{
            that.paidInfo = res.data.result
          })
          this.paid=true;
          this.prePay=false;
          this.preJudge=false
        }else{
          this.paid=false
          this.prePay=false
          this.preJudge=true
        }
      },
      goPay:function (idx) {
        this.courseId.push(this.preInfo[idx].courseId)
        this.$router.push({path:'payOrder',query:{totalCost:this.preInfo[idx].total,courseId:this.courseId}})
      },
      dropOrder:function (idx) {
        let  that = this
        axios({
          method:'post',
          url:'/dropOrder',
          data:{
            courseId:that.preInfo[idx].courseId
          }
        }).then(res=>{
          if(res.data.status){
            location.href='orderLists'
          }
        })
      }

    },
    mounted(){
      let that = this
      axios.get('/listsInfo').then(res=>{
        that.preInfo = res.data.result
        console.log(res.data.result)
      })
    }
  }
</script>
<style lang="stylus">
.content
  width 100%
  color #666
  overflow auto
  .orderHeader
    width 100%
    height 50px
    text-align center
    line-height 50px
    border-bottom 1px solid #eee
    position fixed
    z-index 20192010
    background #fff
    img
      float left
      width 12px
      height 20px
      margin-top 15px
      margin-left 15px
  .nav
    width 100%
    height 40px
    border-bottom 1px solid #eee
    margin-top 50px
    position fixed
    z-index 201920100
    background #fff
    li
      list-style-type none
      float left
      width 33.3%
      text-align center
      line-height 40px
      font-size 12px
      box-sizing border-box
  .judge
    background #eee
    width 100%
    margin-left 0
    margin-top 85px
    z-index 0
    height 100%
    img
      width 100%
      margin-left -5.3vw
    p
      color #666
      text-align center
      font-size 16px
      margin-left -5.3vw
  .menu_lists
    width 100%
    margin-left 0
    margin-top 85px
    z-index 0
    margin-bottom 60px
    li
      width 100vw
      height 258px
      list-style-type none
      margin-left -40px
      p
        width 100%
        height 40px
        line-height 40px
        font-size 12px
        border-bottom 1px solid #eee
        padding-left 15px
        span
          color #ef4040
          float right
          margin-right 15px
      .box
        width 100%
        height 110px
        background #f5f5f5
        position  relative
        overflow hidden
        img
          width 80px
          height 80px
          margin-left 10px
          margin-top 15px
          position absolute
        h3
          width 80px
          height 18px
          font-size 13px
          margin-top 80px
          position absolute
          background #ef4040
          margin-left 10px
          text-align center
          color #fff
        .textInfo
          width 95vw
          height 80px
          p
            width 90vw
            height 20px
            margin-left 80px
            border-bottom none
       h4
        width 100%
        text-align right
        font-weight normal
        height 60px
        border-bottom 1px solid #eee
        line-height 60px
        span
          color #ef4040
          margin-right 15px
      .more
        width 100%
        height 48px
        font-size 12px
        border-bottom 5px solid #ddd
        span
          float right
          margin-top 10px
          margin-right 15px
          height 26px
          padding 5px 8px
        .no_more
          border-radius 2px
          border 1px solid #888
        .order_all
          border-radius 2px
          border 1px solid #ef4040
.activeClass
  color #ef4040
  border-bottom 2px solid #ef4040
</style>
