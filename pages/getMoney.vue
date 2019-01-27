<template>
  <div class="content">
    <div class="header">
      <a href="/myPacket">
        <img src="../assets/icon_back_red.png" height="34" width="18"/></a>
      我的钱包
    </div>
    <div class="addMoney" >
      充值
      <input type="text" ref="money">(元)
  </div>
  <p @click="submit">确定</p>
  </div>
</template>
<script>
  import axios from '../plugins/axios'
  export default {
    data(){
      return{
        money:Number
      }
    },
    mounted(){
      let that = this
      axios.get('/userInfo').then(res=>{
        that.money=res.data.msg
      })
    },
    methods:{
      submit:function () {
        let that = this
        this.money+=parseInt(this.$refs.money.value)
        axios({
          method:'post',
          url:'addMoney',
          data:{
            money:that.money
          }
        }).then(res=>{
          if(res.data.status){
            location.href='/myPacket'
          }
        })
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
      .addMoney
        width 100%
        height 40px
        margin-top 20px
        text-align center
      p
        width 25vw
        height 40px
        background #ef4040
        margin 20px auto
        color #fff
        text-align center
        line-height 40px
        border-radius 5px

</style>
