<template>
  <div class="header" v-on:keyup.13="search">
    <div class="search">
      <a href="/"><img src="../assets/icon_back_red.png" height="34" width="18"/></a>
      <div class="search_lesson">
        <a href="#" @click="search"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAACLUlEQVR42ryWz0sUYRjHR91MCSWodtUgCLskRceMEDyokeekSxEUSvUXdPMkQacgMEg8dIpIvah1LrcQESTBQ2YntTDxR0JhbDZ9XvgOjDLvzOz65gMf5t3d930/8847+z5Pme/7Xkxk4Tq0wXmog0OwBvMwAUMw4xUbRhzBceiHbX93bMI32Nnz/Vu4aJkrkqgv2+F7SPQE2uBIqE8GmuABzKmvuZk+qChFfAMKmugZHE0xSTncgh8a9zKNPPzhCvyB33CnmMcmzBNYkPxpWvExWNGg2yVIA06HtqkrjbhfnQf2IQ3o0FyLUBUnzurt3YKcA7FhVPJuW59y/lFdcBgGYcVzE3263rR1MOJ2tYc9dzEJy3AJamziC7AD057bmIIMnLWJc7AK247Fi7rmbGJz9hY89xHMWWETr8MJtV1GVtevNvEnqIIzjsXndF2yifNqX3UobdBLuxC34ldq39Nb6CLua+6hpHz8TidNj4NTqwF+6jQ8lXRWNyufrkPjPqQmHb7RIh6lTYsPNeAznCxROqA5PkJ1WrEZOKKBS9BahLQOxkKl0AeoLaYCyajyMPFX1URLTEVh8m8vbGjMtKQm8nFy2x1dg+XQCkyRMAyPtXfPYTb0+y9tVaVk+SR53OMzSfyuBhf86PiiAm9vHk+UlyXU1UHUKMvUQ6WSyrztcFDUwmu4DO+hE7aS6mpXWFf+v8VW+UGII+Vp99hFhPd8/CDFgfyFKSr/CTAAeRSP6mrP/EwAAAAASUVORK5CYII=" alt=""></a>
        <input style="outline: none" type="text" @focus="focus" ref="words" :placeholder="word">
      </div>
    </div>
    <div class="headerNav">
      <li><a href="">位置</a></li>
      <li><a href="">艺术</a></li>
      <li><a href="">智能排序</a></li>
      <li><a href="" style="border-right: none">筛选</a></li>
    </div>
  </div>
</template>
<script>
import axios from '../plugins/axios'
export default {
  data(){
    return{
      searchWords:'',
      word:'搜索:课程、机构'
    }
  },
  methods:{
    search:function () {
      this.searchWords = this.$refs.words.value
      var that = this
      axios({
        method: 'post',
        url: '/search',
        data: {
          searchWords: that.searchWords
        }
      }).then((res) => {
        console.log(res.data)
        this.$emit('event',res.data)
      })
    },
    focus:function () {
      this.word = ''
    }
  }
}
</script>
<style lang="stylus">
.header
  width 100%
  height 100px
  padding-top 5px
  position fixed
  z-index 1994
  background #fff
  .search
    width 100%
    height 44px
    position relative
    a
      img
        width 13px
        height 18px
        margin-left 20px
        position absolute
        margin-top 10px
    .search_lesson
      width 85vw
      height  35px
      background #ddd
      position absolute
      margin-left 50px
      line-height 35px
      border-radius 70px
      margin-top 5px
      input
        width 70vw
        margin-left 40px
        height 25px
        background #ddd
        border none
  .headerNav
    width 100%
    height 50px
    border-top 1px solid #b2b2b2

    li
      list-style-type none
      width 25%
      height 50px
      float left
      text-align center
      line-height 50px
      border-bottom 1px solid #b2b2b2
      a
        display inline-block
        width 100%
        height 30px
        background url(../assets/sorting_01.png) no-repeat 20vw
        background-size 12px
        line-height 30px
        color #484848
        border-right 1px solid #ddd
        font-size 14px


</style>
