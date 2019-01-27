<template>
  <div class="content">
    <h3></h3>
    <div class="login_form">
      <p><input type="text" style="outline: none" :placeholder="login" @focus="focusLogin" @blur="blurLogin" ref="login"></p>
        <h4>{{login_not}}</h4>
      <p><input type="password" style="outline: none" :placeholder="pwd" @focus="focusPwd" @blur="blurPwd" ref="pwd"></p>
        <h4>{{pwd_not}}</h4>
      <p class="login" @click="loginIn">登录</p>
      <h5>未注册用户登录将自动创建报哪好账号，即视为您已同意<span>《报哪好用户服务协议》</span></h5>
    </div>
  </div>
</template>
<script>
import axios from '../plugins/axios'
  export default {
    data(){
      return{
        login:'请输入账号',
        pwd:'请输入密码',
        username:'' ,
        password:'',
        login_not:'',
        pwd_not:''
      }
    },
    components:{

    },
    mounted(){

    },
    methods:{
     focusLogin:function () {
          this.login=''
      },
     focusPwd:function () {
        this.pwd=''
     },
     blurLogin:function(){
      if (!this.$refs.login.value){
        this.login_not = '账号不能为空'
      }else{
        this.login_not=''
      }
      if(this.$refs.login.value.length>6){
        this.login_not = '用户名不能大于6位'
      }
     },
     blurPwd:function(){
       if (!this.$refs.pwd.value){
         this.pwd_not = '密码不能为空'
       }else{
         this.pwd_not=''
       }
     },
     loginIn:function () {
       let that = this
       this.username = this.$refs.login.value
       this.password = this.$refs.pwd.value
       if (!this.login_not && !this.pwd_not) {
         axios({
           method: 'post',
           url: '/admin',
           data: {
             username: that.username,
             password: that.password,
           }
         }).then((res) => {
           if (res.data.status) {
             location.href = '/my'
           } else {
             that.pwd_not = res.data.result
           }
         })
       }
     }
    }
  }
</script>
<style lang="stylus">
/*html*/
  /*background url(../assets/login_bg.jpg)no-repeat*/
  /*width 100%*/
  /*height 100%*/
  /*background-size 100%*/
  html
    width 100%
    height 100%
    background url(../assets/login_bg.jpg)no-repeat
    background-size 100% 100%
.content
  width 100%
  /*height auto*/
  /*background url(../assets/login_bg.jpg)no-repeat*/
  /*background-size 100%*/
  overflow hidden
  h3
    width 100%
    height 128.5px
    background url(../assets/logo_login.png)no-repeat center
    background-size 70px
    margin-top 50px
  .login_form
    width 90%
    height 296.5px
    margin 25px auto
    h4
      font-size 12px
      height 20px
      color brown
      font-weight normal
      margin-left 50px
    p
      width 100%
      height 54px
      margin-top 20px
      border-radius 70px
      background #F5F5F5
      input
        width 90%
        float right
        height  54px
        border none
        background none
    .login
      text-align center
      background #9a4a62
      line-height 54px
      font-size 19px
      font-weight normal
      color #fff
    h5
      width 90%
      height 20px
      margin 15px auto
      font-weight normal
      font-size 13px
      color #ccc
      span
        color orange
        font-weight normal

</style>
