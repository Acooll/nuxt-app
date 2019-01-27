<template>
  <div class="container">
    <div class="top_header">
     <img src="../assets/icon_back_red.png" height="34" width="18" @click="jumpBack"/>
      确认订单
    </div>
    <div class="goPay">
      <span>去支付(还剩60s)</span>
    </div>
    <div class="payInfo">
      <p>订单号码 : 2015150102552310</p>
      <p>购买课程 : 钢琴基础</p>
      <p>订单金额 : {{totalCost}}</p>
    </div>
    <div class="radio_bank">
      <p class="choose">选择支付方式:</p>
      <p class="weChat" @click="payChanged" ref="weChat" >
        <span></span>
        微信支付
      </p>
      <p class="zhifubao" @click="payChange" ref="bao">
       <span></span>
       支付宝支付
      </p>
    </div>
    <div class="submit" @click="submit">
      确认支付
    </div>
  </div>
</template>
<script>
import bus from '../plugins/bus'
import axios from '../plugins/axios'
  export default{
    data(){
      return{
        totalCost:'',
        money:'',
        courseId:''
      }
    },
    mounted(){
      let that = this
      this.totalCost = this.$route.query.totalCost
      this.courseId = this.$route.query.courseId
      console.log(this.courseId)
      axios.get('/userInfo').then(res=>{
        if(res.data.msg){
          that.money = res.data.msg
        }
      })
    },
    methods: {
      payChange: function () {
        this.$refs.bao.classList.add('classOn')
        this.$refs.weChat.classList.add('classNot')
        this.$refs.bao.classList.remove('classNot')
      },
      payChanged: function () {
        this.$refs.bao.classList.add('classNot')
        this.$refs.weChat.classList.add('classOn')
        this.$refs.weChat.classList.remove('classNot')
      },
      jumpBack:function () {
        this.$router.back(-1)
      },
      submit:function () {
        let that = this
        if(this.money>=this.totalCost) {
          axios({
            method:'post',
            url:'/submitPay',
            data:{
              money:that.money-that.totalCost,
              courseId:that.courseId
            }
          }).then(res=>{
            if(res.data.status){
              location.href = '/paySuccess'
            }
          })
          l
        }
      }
    },

  }
</script>



<style lang="stylus">
.container
  width 100%
  height 880px
  background #eee
  .top_header
    width 100%
    height 50px
    line-height 50px
    text-align center
    background #fff
    color #666
    img
      width 12px
      height 20px
      float left
      margin-top 13px
      margin-left 18px
  .goPay
    width 100%
    height 40px
    background #7d8590
    line-height 40px
    text-align center
    span
      width 100px
      height 25px
      color #fff
      font-size 15px
      background url(../assets/time_leave.png) no-repeat left
      background-size 15px
      padding-left 18px
   .payInfo
    width 100%
    height 108px
    background url(../assets/ding_bgc.png) repeat-x 0 100% #fff
    background-size 14px 10px
    overflow hidden
    p
      margin-top 10px
      font-size 12px
      width 100%
      height 20px
      padding-left 10px
      color #666
  .radio_bank
    width 100%
    height 160px
    margin-top 10px
    background #fff
    color #666
    font-size 13px
    overflow hidden
    .choose
      width 100%
      border-bottom 1px solid #ddd
      height 50px
      margin-top 10px
      padding-left 20px
    .weChat
      width 100%
      border-bottom 1px solid #ddd
      height 50px
      line-height 50px
      font-weight bold
      background url(../assets/kid_radio_on.png) no-repeat 94vw
      background-size 16px
      color #000
      span
        display inline-block
        background url(../assets/pay_icon_wei.png) no-repeat center #f0f0f0
        background-size 30px 24px
        width 50px
        height 34px
        margin-left 12px
        margin-top 8px
    .zhifubao
      width 100%
      border-bottom 1px solid #ddd
      height 50px
      line-height 50px
      color #000
      font-weight bold
      background url(../assets/kid_radio.png) no-repeat 94vw
      background-size 16px
      span
        display inline-block
        background url(../assets/pay_icon_zhi.png) no-repeat center #f0f0f0
        background-size 30px 24px
        width 50px
        height 34px
        margin-left 12px
        margin-top 8px
  .submit
    width 95%
    height 50px
    background #ef4040
    margin 20px auto
    line-height 50px
    text-align center
    color #fff
    border-radius 5px
.classOn
  background url(../assets/kid_radio_on.png) no-repeat 94vw !important
  background-size 16px !important
.classNot
  background url(../assets/kid_radio.png) no-repeat 94vw  !important
  background-size 16px !important

</style>
