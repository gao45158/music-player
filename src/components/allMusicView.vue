<template>
  <div class="lized">
    <div class="item" @click="musicl(mpItem.id)" v-for="mpItem in mp">
      <div class="item-pic"><img :src="mpItem.picUrl" alt=""></div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import { personalized } from '../config/api'

  export default {
    name: 'allMusicView',
    data () {
      return {
        mp: null
      }
    },
    mounted() {
      const that = this;
      // 获取推荐歌单
      axios.get(personalized).then(function (res) {
        that.mp = res.data.result.slice(0, 15);
      });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
  @import '../common/css/rem'

  .lized
    width 100%
    display flex
    margin: 0 auto;
    flex-flow row wrap
    padding (f-rem(95px)rem) (f-rem(15px)rem) (f-rem(15px)rem) (f-rem(15px)rem)
    box-sizing border-box
    justify-content center
    .item
      display: inline-flex;
      width 30%
      flex 1 1 auto
      padding f-rem(15px)rem
      box-sizing border-box
      .item-pic
        width 100%
        padding: f-rem(10px)rem;
        border: 1px solid #ccc;
        box-sizing border-box
        img 
          width 100%
          display inline-block
          float left
      // .item-name
      //   font-size f-rem(24px)rem
      //   overflow hidden
      //   white-space nowrap
      //   text-overflow ellipsis
      //   height f-rem(40px)rem
      //   line-height f-rem(40px)rem
</style>
