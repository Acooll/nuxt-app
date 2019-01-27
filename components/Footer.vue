<template>
  <div class="footerNav">
    <p></p>
    <li v-for="(item,idx) in navLists" >
      <nuxt-link :class="item.className" :to="item.link" @click="changeClass(item,idx)"></nuxt-link>
      <span>{{item.words}}</span>
    </li>
    <!--<li>-->
      <!--<a  class="type_nav" href="/classify"></a>-->
      <!--<span>分类</span>-->
    <!--</li>-->
    <!--<li>-->
      <!--<a class="car_nav" href="/shoppingCart"></a>-->
      <!--<span>购物车</span>-->
    <!--</li>-->
    <!--<li>-->
      <!--<a class="my_nav" href="/my"></a>-->
      <!--<span>我的</span>-->
    <!--</li>-->
  </div>
</template>
<script>
  export default {
    data(){
      return{
        navLists:[{words:'首页',img:'icon_tab_home.png',link:'/',className:'home_nav'},{words:'分类',img:'icon_tab_class.png',link:'/classify',className:'type_nav'},{words:'购物车',img:'icon_tab_cart.png',link:'/shoppingCart',className:'car_nav'},{words:'我的',img:'icon_tab_my.png',link:'/my',className:'my_nav'}]
      }
    },
    methods:{
      changeClass:function (item,idx) {
        console.log(item)
      }
    }
  }
</script>


<style lang="stylus">
.footerNav
  width 100%
  height 70px
  bottom 0
  position fixed
  background #fff
  p
    height 10px
    background #f0f0f0
    border-bottom 1px solid #b2b2b2
  li
    list-style-type none
    float left
    height 53px
    width 25vw
    position relative
    .home_nav
      display inline-block
      width 25vw
      height 50px
      background url(../assets/icon_tab_home.png) center 10px no-repeat
      background-size 19px
      &.nuxt-link-exact-active
        display inline-block
        width 25vw
        height 50px
        background url(../static/img/icon_tab_home_on.png) center 10px no-repeat
        background-size 19px
    .type_nav
      display inline-block
      width 25vw
      height 50px
      background url(../assets/icon_tab_class.png) center 10px no-repeat
      background-size 19px
      &.nuxt-link-active
        display inline-block
        width 25vw
        height 50px
        background url(../static/img/icon_tab_class_on.png) center 10px no-repeat
        background-size 19px
    .car_nav
      display inline-block
      width 25vw
      height 50px
      background url(../assets/icon_cart.png) center 10px no-repeat
      background-size 19px
      &.nuxt-link-active
        display inline-block
        width 25vw
        height 50px
        background url(../assets/icon_on_cart.png) center 10px no-repeat
        background-size 19px
    .my_nav
      display inline-block
      width 25vw
      height 50px
      background url(../assets/icon_tab_my.png) center 10px no-repeat
      background-size 19px
      &.nuxt-link-active
        display inline-block
        width 25vw
        height 50px
        background url(../assets/icon_tab_my_on.png) center 10px no-repeat
        background-size 19px
    span
      display inline-block
      width 100%
      text-align center
      position absolute
      font-size 13px
      bottom 0
      color #474747

</style>
