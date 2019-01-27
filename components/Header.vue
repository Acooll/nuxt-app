<template>
  <div class="headerNavs">
    <div class="header_left">
      <a href="" class="city_change" >北京</a>
      <a href="" class="city_logo"><img src="../assets/city_change.png" height="14" width="24"/></a>
    </div>
    <div class="search_box">
      <router-link to="/course"  class="jump"><img src="../assets/search.png" height="30" width="30"/></router-link>
      <input type="text" :placeholder="word" ref="words"  @focus="focus" style="outline: none">
    </div>
    <a href=""></a>
  </div>
</template>
<script>
  export default {
    data(){
    return{
      searchWords:'',
      word:'搜索:课程、机构'
    }
    },
    methods:{
      focus:function () {
        location.href='/course'
      }
    }


  }
</script>
<style lang="stylus">
.headerNavs
  width 100vw
  height 44px
  background #ef3f41
  overflow hidden
  padding-top 5px
  position fixed
  z-index 199401121
  .header_left
    width 80px
    height 44px
    padding-top 7px
    text-align center
    float left
    a
      color #fff
      font-size 15px
      img
        width 13px
        height 8px
  .search_box
    width 75vw
    height 27px
    background #a20407
    border 1px
    border-radius 70px
    margin-top 6px
    float left
    .jump
      img
        width 14px
        height 14px
        margin-left 10px
        margin-top 7px
    input
      width 57vw
      height 20px
      background #a20407
      border none
      margin-left 8px
    input::-webkit-input-placeholder
      color #ffffff
      font-size 12px
    input::-moz-placeholder
      color #ffffff
      font-size 12px
    input::-ms-input-placeholder
      color #fff
      font-size 12px







</style>
