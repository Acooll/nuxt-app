<template>
  <div class="content">
    <div class="header">
      <a href="/my">
      <img src="../assets/icon_back_red.png" height="34" width="18"/></a>
      我的钱包
    </div>
    <div class="myMoney">
      <p>当前余额(￥)</p>
      <h4>{{money}}</h4>
    </div>
    <div class="saveMoney" @click="getMoney">
      充值
    </div>
  </div>
</template>
<script>
  import axios from '../plugins/axios'
  export default {
    data(){
      return{
        money:""
      }
    },
    mounted(){
      let that = this
      axios.get('/userInfo').then(res=>{
        that.money=res.data.msg
      })
    },
    methods: {
      getMoney: function () {
        location.href='/getMoney'
      }
    }
  }
</script>
<style lang="stylus">
html
  width 100%
  height 100%
  background #ddd
  .content
    width 100%
    .header
      width 100%
      height 50px
      text-align center
      line-height 50px
      background #fff
      color #666
      img
        width 12px
        height 18px
        float left
        margin-top 15px
        margin-left 15px
     .myMoney
        width 100%
        height 200px
        background #353c41
        color #fff
        overflow auto
        p
          margin-top 15px
          margin-left 15px
        h4
          text-align center
          font-size 70px
     .saveMoney
        width 92%
        margin 20px auto
        height 40px
        background #ef4040
        color #fff
        text-align center
        line-height 40px
        border-radius 5px
</style>
