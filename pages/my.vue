<template>
  <div class="container">
    <div class="my_container">
      <div class="head_box">
        <div class="avatar" v-if="no_login">
            <img src="../assets/parentActor.png" height="120" width="130"/>
          <h2><a href="/login" style="color: #fff">登录</a></h2>
        </div>
          <div class="login_info" v-if="login_info">
            <img src="../assets/con_lft_tp.jpg"  >
            <h3>{{username}}</h3>
            <p>余额<span>￥{{money}}</span></p>
          </div>
      </div>
      <div class="my_order">
        <p>
          我的订单
          <a href="#" @click="seeAll">查看全部订单</a>
        </p>
        <ul>
          <li ><a class="pay" href="/orderlists"><span>代付款</span></a></li>
          <li><a class="judge" href=""><span>待评价</span></a></li>
          <li><a href="" class="delect"><span>已取消</span></a></li>
        </ul>
      </div>
      <div class="my_business">

          <li>
            <p class="my_child">我的孩子
              <a href="">管理孩子信息</a>
            </p>
          </li>
        <li>
          <p class="my_money">我的钱包
            <a href="/myPacket">查看钱包</a>
          </p>
        </li>
        <li>
          <p class="my_discount"> 我的优惠
            <a href="">查看优惠信息</a>
          </p>
        </li>
        <li>
          <p class="my_change"> 设置
            <a href="">设置</a>
          </p>
        </li>
      </div>
    </div>
    <my-footer/>
  </div>
</template>
<script>
import MyFooter from '../components/Footer'
import axios from '../plugins/axios'
export default{
  data(){
    return{
      no_login:true,
      login_info:false,
      username:'',
      money:''
    }
  },
  components:{
    MyFooter
  },
  mounted(){
    let that = this
    axios.get('/userInfo').then(res=>{
      if(res.data.result){
        that.no_login = false
        that.login_info=true
        that.username = res.data.result
        that.money = res.data.msg
      }
      console.log(res.data.result)
    })
  },
  methods:{
    seeAll:function () {
      if(this.login_info){
        location.href='orderLists'
      }else{
        location.href='login'
      }
    }
  }
}
</script>
<style lang="stylus">
/*.container*/
  /*width 100%*/
  /*height 603px*/
  /*background orange*/
  .my_container
    width 100%
    height 810px
    background #eee
    .head_box
      width 100%
      height 202.8px
      background url(../assets/my_bg_img.png) no-repeat #fff
      background-size 100% 70%
      position relative
      .login_info
        position absolute
        left 50%
        top 50%
        text-align center
        transform translate(-50%,-42%)
        color #474747
        font-size 14px
        img
          width 82px
          height 82px
          border-radius 50%
          background #fff
        p
          margin-top 8px
          span
            color #ef4040
      .avatar
        position absolute
        left 50%
        top 50%
        /*width 120px*/
        /*height 150px*/
        text-align center
        transform translate(-50%,-42%)
        img
          width 82px
          height 82px
          border-radius 50%
          background #fff
        h2
          height 30px
          line-height 30px
          width 72px
          font-size 16px
          background #ef4040
          margin-top 16px
          border-radius 4px
          margin-left 3px
  .my_order
    width 100%
    height 148px
    background #fff
    margin-top 10px
    overflow hidden
    p
      width 100%
      height 57.6px
      line-height 57.6px
      border-bottom 1px solid #ddd
      font-size 15px
      color #474747
      background url(../assets/icon_my_order.png) no-repeat 10px
      background-size 15px
      padding-left 35px
      padding-right 10px
      a
        background url(../assets/more_tip.png) no-repeat right
        display inline-block
        float right
        padding-right 25px
        background-size 12px
        color #333
    ul
      width 100%
      height 90px
      li
        list-style-type none
        height 77px
        width 33.33vw
        margin-left -20px
        overflow hidden
        float left
        text-align center
        line-height 77px
        padding-top 15px
        span
          display inline-block
          margin-top 10px
          color #474747
          font-size 14px
        .pay
          background url(../assets/icon_pay.png) no-repeat top
          display inline-block
          width 20vw
          height 60px
          background-size 30px
        .judge
          background url(../assets/icon_ping.png) no-repeat top
          background-size 30px
          display inline-block
          width 20vw
          height 60px
        .delect
          background url(../assets/icon_cancel.png) no-repeat top
          background-size 30px
          display inline-block
          width 20vw
          height 60px
.my_business
  width 100%
  height 229px
  margin-top 10px
  li
    list-style-type none
    width 100%
    background #fff
    height 54px
    line-height 54px
    .my_child
      padding-left 40px
      padding-right 15px
      background url(../assets/icon_my_pay.png) no-repeat 15px
      background-size 20px
      font-size 15px
      font-weight bold
      a
        display inline-block
        float right
        background url(../assets/pay_go.png) no-repeat right
        padding-right 18px
        background-size 7px
        font-weight lighter
        color #999
    .my_money
      padding-left 40px
      padding-right 15px
      background url(../assets/icon_my_pay.png) no-repeat 15px
      background-size 20px
      font-size 15px
      font-weight bold
      a
        display inline-block
        float right
        background url(../assets/pay_go.png) no-repeat right
        padding-right 18px
        background-size 7px
        font-weight lighter
        color #999
    .my_discount
      padding-left 40px
      padding-right 15px
      background url(../assets/icon_my_child.png) no-repeat 15px
      background-size 20px
      font-size 15px
      font-weight bold
      a
        display inline-block
        float right
        background url(../assets/pay_go.png) no-repeat right
        padding-right 18px
        background-size 7px
        font-weight lighter
        color #999
    .my_change
      padding-left 40px
      padding-right 15px
      background url(../assets/icon_set.png) no-repeat 15px
      background-size 20px
      font-size 15px
      font-weight bold
      margin-top 10px
      a
        display inline-block
        float right
        background url(../assets/pay_go.png) no-repeat right
        padding-right 18px
        background-size 7px
        font-weight lighter
        color #999
</style>
