<template>
  <div id="app" class="main">
    <v-touch class="vt" @swiperight="show(true)"></v-touch>
    <div class="main-wapper" ref="main">
      <div class="header" v-show="this.$route.meta.viewBl">
        <div @click="show" class="head-btn left">我的</div>
        <router-link class="title" to="/">音乐播放器</router-link>
        <!-- <div class="head-btn right">搜索</div> -->
      </div>
      <router-view />
    </div>
    <leftnaView :lnav="leftnav" @lnav="leftNav" />
  </div>
</template>

<script>
import { getStore, reStore } from './config/cookies'
import leftnaView from './components/leftnaView'

export default {
  name: 'App',
  data() {
    return {
      screenWidth: document.documentElement.clientHeight, // 获取可视区域初始高度
      leftnav: false // 左侧菜单状态
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
    // 检验cookies
    if (ld) {
      this.$store.dispatch('login', ld);
    };
  },
  methods: {
    show(bl) {
      this.leftnav = bl;
    },
    screenFun(_this) {
      window.screenWidth = document.documentElement.clientHeight;
      _this.screenWidth = window.screenWidth;
      _this.$refs.main.style.minHeight = _this.screenWidth + 'px';
    },
    leftNav(data) {
      this.leftnav = data;
    }
  },
  watch: {
    screenWidth(val) {
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
    .vt
      width f-rem(28px)rem
      height 100%
      position fixed
      left 0
      top 0
      background none
      z-index 10
    .main-wapper
      width 100%
      position relative
      .header
        width 100%
        height f-rem(80px)rem
        position fixed
        left 0
        top 0
        z-index 20
        line-height f-rem(80px)rem
        background #676767
        font-size f-rem(32px)rem
        color #fff
        box-shadow 0 (f-rem(2px)rem) (f-rem(6px)rem) #000
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
          display block
          height f-rem(80px)rem
          margin 0 (f-rem(120px)rem)
          text-align center
          box-sizing border-box
          color #fff
</style>