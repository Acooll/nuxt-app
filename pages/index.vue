<template>
  <div class="containers">
    <my-header />
    <div class="lists">
      <div class="banner">
        <el-carousel :interval="5000" arrow="never">
          <el-carousel-item v-for="item in banners" >
            <a href=""><img :src="item" alt=""></a>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="type_lists">
          <li v-for="(item,idx) in typeLists" @click="goSearch(idx)" :key="idx">
            <router-link to="/course"><img :src="item.img" alt=""></router-link>
            <p>{{item.title}}</p>
          </li>
      </div>
    </div>
    <div class="school" style="height: 266.5px">
      <div class="tit_box">
        <img src="http://cdn.baonahao.com/bnhnew/img/icon_jigou.png" alt="">
        <span>推荐学校</span>
        <nuxt-link class="more_sch" to="/course" >
        <span @click="moreSchool">更多学校</span><img class="more_icon" src="http://cdn.baonahao.com/bnhnew/img/icon_more.jpg" alt="">
        </nuxt-link>
      </div>
      <div class="school_box" >
        <li><img src="../assets/school_1.jpg" height="500" width="500"/></li>
        <li><img src="../assets/school_2.png" height="161" width="161"/></li>
        <li><img src="../assets/school_3.jpg" height="500" width="500"/></li>
        <li><img src="../assets/school_4.jpg" height="300" width="300"/></li>
      </div>
    </div>
    <div class="school_con" >
      <div class="tit_box">
        <img src="http://cdn.baonahao.com/bnhnew/img/icon_middle.png" alt="">
        <span>中小学</span>
        <nuxt-link class="more_sch" to="/course">
          <span @click="moreSchool">更多课程</span><img class="more_icon" src="http://cdn.baonahao.com/bnhnew/img/icon_more.jpg" alt="">
        </nuxt-link>
      </div>
      <ul class="good_lesson">
        <li>
          <nuxt-link to="/course"><img src="http://cdn.baonahao.com/bnhnew/img/cls_mid1.jpg" alt="" @click="moreSchool"></nuxt-link>
          <div>精品钢琴课</div>
        </li>
        <li>
          <nuxt-link to="/course"><img src="http://cdn.baonahao.com/bnhnew/img/cls_mid2.jpg" alt="" @click="moreSchool"></nuxt-link>
          <div>精品数学课</div>
        </li>
      </ul>
      <ul class="class_more">
        <li>
        <nuxt-link to="#">
          <span>初中数学</span>
          <img src="http://cdn.baonahao.com/bnhnew/img/cls_icon_chaness.png" alt="" style="height: 34vw" >
        </nuxt-link>
        </li>
        <li>
          <nuxt-link to="#">
            <span>五年级语文</span>
            <img src="http://cdn.baonahao.com/bnhnew/img/cls_icon_english.png" alt="" style="height: 34vw" >
          </nuxt-link>
        </li>
        <li>
          <a href="">
            <span>一年级英语</span>
            <img src="http://cdn.baonahao.com/bnhnew/img/cls_icon_wuli.png" alt="">
          </a>
        </li>
        <li>
          <a href="">
            <span>初一语文</span>
            <img src="http://cdn.baonahao.com/bnhnew/img/cls_icon_math.png" alt="">
          </a>
        </li>
      </ul>
    </div>
    <div class="school_con" >
      <div class="tit_box">
        <img src="http://cdn.baonahao.com/bnhnew/img/icon_art.png" alt="">
        <span>艺术/体育</span>
        <nuxt-link class="more_sch" to="/course">
          <span @click="moreSchool">更多课程</span><img class="more_icon" src="http://cdn.baonahao.com/bnhnew/img/icon_more.jpg" alt="">
        </nuxt-link>
      </div>
      <ul class="good_lesson">
        <li>
          <nuxt-link to="/course"><img src="http://cdn.baonahao.com/bnhnew/img/cls_mid3.jpg" alt="" style="height: 34vw" @click="moreSchool"></nuxt-link>
          <div>精品钢琴课</div>
        </li>
        <li>
          <nuxt-link to="/course"><img src="http://cdn.baonahao.com/bnhnew/img/cls_mid4.jpg" alt="" style="height: 34vw" @click="moreSchool"></nuxt-link>
          <div>精品数学课</div>
        </li>
      </ul>
      <ul class="class_more">
        <li>
          <a href="">
            <span>钢琴</span>
            <img src="http://cdn.baonahao.com/bnhnew/img/cls_icon_gangqin.png" alt="" >
          </a>
        </li>
        <li>
          <a href="">
            <span>打击乐</span>
            <img src="http://cdn.baonahao.com/bnhnew/img/cls_icon_guzheng.png" alt="">
          </a>
        </li>
        <li>
          <a href="">
            <span>古筝</span>
            <img src="http://cdn.baonahao.com/bnhnew/img/cls_icon_jita.png" alt="">
          </a>
        </li>
        <li>
          <a href="">
            <span>双簧管</span>
            <img src="http://cdn.baonahao.com/bnhnew/img/cls_icon_tiqin.png" alt="">
          </a>
        </li>
      </ul>
    </div>
    <div class="school_con" >
      <div class="tit_box">
        <img src="http://cdn.baonahao.com/bnhnew/img/icon_liuxue.png" alt="">
        <span>语言|留学</span>
        <nuxt-link class="more_sch" to="/course">
          <span @click="moreSchool">更多课程</span><img class="more_icon" src="http://cdn.baonahao.com/bnhnew/img/icon_more.jpg" alt="">
        </nuxt-link>
      </div>
      <ul class="good_lesson">
        <li>
          <nuxt-link to="/course"><img src="http://cdn.baonahao.com/bnhnew/img/cls_mid5.jpg" alt="" style="height: 34vw" @click="moreSchool"></nuxt-link>
          <div>精品日语</div>
        </li>
        <li>
          <nuxt-link to="/course"><img src="http://cdn.baonahao.com/bnhnew/img/cls_mid6.jpg" alt="" style="height: 34vw" @click="moreSchool"></nuxt-link>
          <div>精品德语</div>
        </li>
      </ul>
      <ul class="class_more" style="margin-bottom: 60px">
        <li>
          <a href="">
            <span>新概念英语</span>
            <img src="http://cdn.baonahao.com/bnhnew/img/cls_icon_putao.png" alt="">
          </a>
        </li>
        <li>
          <a href="">
            <span>剑桥英语</span>
            <img src="http://cdn.baonahao.com/bnhnew/img/cls_icon_waijiao.png" alt="">
          </a>
        </li>
        <li>
          <a href="">
            <span>葡萄牙语</span>
            <img src="http://cdn.baonahao.com/bnhnew/img/cls_icon_xingainian.png" alt="">
          </a>
        </li>
        <li>
          <a href="">
            <span>外教口语</span>
            <img src="http://cdn.baonahao.com/bnhnew/img/cls_icon_jianqiao.png" alt="">
          </a>
        </li>
      </ul>
    </div>
    <my-footer/>
  </div>
</template>

<script>
import MyHeader from '~/components/Header.vue'
import MyFooter from '../components/Footer'
import axios from '../plugins/axios'
import bus from '../plugins/bus'
export default {
  data(){
    return{
      banners:['http://file.baonahao.com/image/lt/20160912/ca66fb2461a6e85b7dfacfc87f099366.jpg','http://file.baonahao.com/image/lt/20161010/02f5e2cca1556421fe11dd3013bfd40a.jpg','http://file.baonahao.com/image/lt/20160804/bf976480506d5be9752acdce8c9b6a91.jpg','http://file.baonahao.com/image/lt/20161012/49454f829a57e77d7444de15f8a9e935.jpg'],
      typeLists:[{title:'音乐',img:'http://cdn.baonahao.com/bnhnew/img/class_art_icon.png'},{title:'游泳',img:'http://cdn.baonahao.com/bnhnew/img/class_tiyu_icon.png'},{title:'英语',img:'http://cdn.baonahao.com/bnhnew/img/class_yuyan_icon.png'},{title:'留学',img:'http://cdn.baonahao.com/bnhnew/img/class_liuxue_icon.png'},
        {title:'小学',img:'http://cdn.baonahao.com/bnhnew/img/class_xiao_icon.png'},{title:'数学',img:'http://cdn.baonahao.com/bnhnew/img/class_sheng_icon.png'},{title:'化学',img:'http://cdn.baonahao.com/bnhnew/img/class_chuzhong_icon.png'},{title:'考试',img:'http://cdn.baonahao.com/bnhnew/img/class_zhongkao_icon.png.png'},
        {title:'高中',img:'http://cdn.baonahao.com/bnhnew/img/class_gao_icon.png'},{title:'更多',img:'http://cdn.baonahao.com/bnhnew/img/class_sheng_icon.png'}
      ],
      lesson:''
    }
  },
  components: {
    MyHeader,
    MyFooter
  },
  methods:{
    goSearch:function (idx) {
      let that = this
      if (idx === 9) {
        location.href = '/classify'
      } else {
        axios({
          method: 'post',
          url: '/search',
          data: {
            searchWords: that.typeLists[idx].title
          }
        }).then((res) => {

          bus.$emit('sendLessons', res.data.result.data)
        })
      }
    },
    moreSchool:function () {
      console.log(444)
      axios({
        method: 'post',
        url: '/search',
        data: {
          searchWords: '教育'
        }
      }).then((res) => {
        bus.$emit('sendLessons', res.data.result.data)
      })
    }
  }
}
</script>

<style lang="stylus">
.containers
  width 100%
  background #eee
  overflow hidden
  .lists
    width 100%
  .banner
    width 100%
    height 37.6vw
    background #7f828b
    margin-top 44px
    .el-carousel
      width 100%
      height 37.6vw
      position none
      img
        width 100%
  .type_lists
    width 100%
    height 165px
    background #fff
    li
      list-style-type none
      width 20vw
      height 66px
      float left
      margin-top 10px
      text-align center
      img
        width 40px
        height 40px
      p
        color #484848
        font-size 12px
  .school
    width 100%
    height 266.5px
    background #fff
    margin-top 10px
    overflow hidden
    .tit_box
      width 98vw
      height 25px
      margin 0 auto
      background #fff
      margin-top 15px
      font-size 15px
      font-weight bold
      img
        width 15px
        height 15px
      .more_sch
        color #7f828b
        float right
        font-size 14px
        font-weight lighter
      .more_icon
        float right
        margin-top 2px
    .school_box
      width 98vw
      margin 0 auto
      height 206px
      margin-top 10px
      li
        width 25%
        height 200px
        list-style-type none
        float left
        img
          width 96%
          height 200px
.good_lesson
  width 98vw
  margin 0 auto
  height 37.6vw
  margin-top 10px
  padding 0
  li
    width 50%
    list-style-type none
    float left
    background #f7f8fb
    img
      width 48vw
    div
      margin-top -4px
      line-height 24px
      width 48vw
      height 24px
      font-size 13px
      color #fff
      background-color rgba(0,0,0,.6)
      text-align center
.class_more
  width 98vw
  margin 0 auto
  height 100px
  padding 0
  margin-top 15px
  border-top 1px solid #eee
  li
    list-style-type none
    width 49vw
    height 50px
    float left
    text-align center
    a
      display block
      width 49vw
      height 50px
      border-bottom 1px solid #eee
      border-right 1px solid #eee
      span
        font-size 14px
        line-height 50px
        color #666
      img
        width 30px
        height 30px
        float right
        margin-right 20px
        margin-top 10px
.school_con
  width 100%
  background #fff
  margin-top 10px
  overflow hidden
  color #666
  .tit_box
    width 98vw
    height 25px
    margin 0 auto
    background #fff
    margin-top 15px
    font-size 15px
    font-weight bold
    img
      width 15px
      height 15px
    .more_sch
      color #7f828b
      float right
      font-size 14px
      font-weight lighter
    .more_icon
      float right
      margin-top 2px


</style>
