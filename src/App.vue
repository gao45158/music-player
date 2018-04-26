<template>
  <div id="app" class="main">
    <v-touch @swiperight="show(true)" @swipeleft="show(false)" v-show="this.$route.meta.viewBl">
      <div class="main-wapper" ref="main">
        <div class="header">
          <div @click="show" class="head-btn left">我的</div>
          <div class="title">音乐播放器</div>
          <!-- <div class="head-btn right">搜索</div> -->
        </div>
        <div class="lized">
            <div class="item" @click="musicl(mpItem.id)" v-for="mpItem in mp">
              <div class="item-pic"><img :src="mpItem.picUrl" alt=""></div>
            </div>
        </div>
      </div>
    </v-touch>
    <leftnaView :lnav="leftnav" @lnav="leftNav" />
    <router-view />
  </div>
</template>

<script>
import axios from 'axios'
import { personalized } from './config/api'
import { getStore, reStore } from './config/cookies'
import leftnaView from './components/leftnaView'

export default {
  name: 'App',
  data() {
    return {
      screenWidth: document.documentElement.clientHeight, // 获取可视区域初始高度
      leftnav: false, // 左侧菜单状态
      mp: null // 获取歌单 前6条数据
    }
  },
  mounted () {
    const that = this
    const ld = JSON.parse(getStore('loginData'));
    // resize
    this.screenFun(this);
    window.onresize = () => {
      return (() => {
        that.screenFun(that);
      })
    };
    // 进入页面检验是否存在登录cookies
    if (ld) {
      this.$store.dispatch('login', ld);
    };
    // 获取推荐歌单
    axios.get(personalized).then(function (res) {
      that.mp = res.data.result.slice(0, 6);
    });
  },
  methods: {
    show(bl) {
      this.leftnav = bl;
    },
    screenFun(_this) {
      window.screenWidth = document.documentElement.clientHeight;
      _this.screenWidth = window.screenWidth;
      _this.$refs.main.style.height = _this.screenWidth + 'px';
    },
    musicl(id) {
      console.log(id);
      // axios.get(userDetail+`?id=${id}`).then(function (res) { });
    },
    leftNav(data) {
      this.leftnav = data;
    }
  },
  watch: {
    screenWidth (val) {
      this.screenWidth = val;
    }
  },
  components: {
    leftnaView
  }
}
</script>

<style lang="stylus" scoped>
  @import './common/css/rem'

  .main
    width 100%
    .main-wapper
      width 100%
      position relative
      .header
        width 100%
        height f-rem(80px)rem
        line-height f-rem(80px)rem
        background #676767
        font-size f-rem(32px)rem
        color #fff
        position relative
        z-index 10
        .head-btn 
          width f-rem(120px)rem
          height f-rem(80px)rem
          text-align center
          display inline-block
          position absolute
          top 0
          font-size f-rem(28px)rem
          &.left
            left 0
          &.right
            right 0
        .title 
          height f-rem(80px)rem
          padding 0 f-rem(120px)rem
          text-align center
          box-sizing border-box
      .lized
        width 100%
        display flex
        margin: 0 auto;
        flex-flow row wrap
        padding f-rem(15px)rem
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