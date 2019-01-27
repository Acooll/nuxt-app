<template>
  <div class="content">
    <course-header @event="event" />
    <course-lists :message="lessonDetail" />
  </div>
</template>
<script>
  import CourseHeader from '../components/CourseHeader'
  import CourseLists from '../components/CourseLists'
  import bus from '../plugins/bus'
  export default {
    data(){
      return{
        lessonDetail:'',
        lessones:''
      }
    },
    components:{
      CourseHeader,
      CourseLists
    },
    beforeMount(){
      let that = this
      bus.$on('sendLessons',function (res) {
        console.log(res)
        that.lessonDetail = res
      })
    },
    methods:{
      event:function (data) {
        this.lessonDetail = data.result.data
        // console.log(data)
      },

    }
  }
</script>
<style lang="stylus">
.content
  width 100%
  /*height 1500px*/
  /*overflow hidden*/
  overflow auto
</style>
