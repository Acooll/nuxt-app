<template>
  <div class="content">
    <div class="payHeader">
      支付成功
      <span @click="goMy">完成</span>
    </div>
    <div class="paySuc">
      <img src="../assets/icon_alert_scs.png" height="216" width="216"/>
      <h2>支付成功</h2>
      <p>如有任何问题可拨打100-111-1234</p>
    </div>
  </div>
</template>
<script>
  import axios from '../plugins/axios'
  export default {
    data(){
      return{
      }
    },
    methods:{
      goMy:function () {
        location.href = '/my'
      }
    }
  }
</script>
<style lang="stylus">
.content
  width 100%
  height 870px
  overflow hidden
  .payHeader
    width 100%
    height 45px
    text-align center
    line-height 45px
    border-bottom 1px solid #ddd
    color #666
    span
      float right
      margin-right 15px
  .paySuc
    width 100%
    text-align center
    margin-top 15px
    img
      width 120px
      height 120px
    h2
      font-size 20px
      width 100%
      height 50px
      text-align center
      line-height 50px
      color #666
    p
      width 100%
      height 20px
      text-align center
      line-height 20px
      font-size 14px
      color #666
</style>
