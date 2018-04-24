<template>
  <div id="app" class="main">
    <v-touch @swiperight="show" @swipeleft="hide">
      <div class="main-wapper" ref="main">
        <div class="header" v-show="this.$route.meta.viewBl">
          <div @click="show" class="head-btn left">我的</div>
          <div class="title">音乐播放器</div>
          <div class="head-btn right">登录</div>
        </div>
        <router-view></router-view>
      </div>
      <transition name="leftshow">
        <div v-show="leftnav" class="leftnav">
          <div class="mypic">
            <div class="pic" v-if="userDetail"><img :src="userDetail.profile.avatarUrl" alt=""></div>
            <div class="pic" v-else>头像</div>
            <div class="name" v-if="userDetail">{{ userDetail.profile.nickname }}</div>
            <div v-else class="name" @click="login">
              <router-link to="/login">登录 / 注册</router-link>
            </div>
          </div>
          <div class="navlist">
            <ul class="list">
              <li class="item">全部音乐</li>
              <li class="item">最近循环</li>
              <li class="item">我的最爱</li>
            </ul>
          </div>
          <button class="logout" @click="logout">退出登录</button>
        </div>
      </transition>
    </v-touch>
    <fPlayView />
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
import fPlayView from './components/fPlayView'

export default {
  name: 'App',
  data() {
    return {
      screenWidth: document.documentElement.clientHeight,
      leftnav: false,
      name: '',
      pic: ''
    }
  },
  computed: {
    ...mapState(['userDetail'])
  },
  mounted () {
    const that = this
    this.screenFun(this);
    window.onresize = () => {
      return (() => {
        that.screenFun(that);
      })()
    }
  },
  methods: {
    show() {
      this.leftnav = true;
    },
    hide() {
      this.leftnav = false;
    },
    screenFun(_this) {
      window.screenWidth = document.documentElement.clientHeight;
      _this.screenWidth = window.screenWidth;
      _this.$refs.main.style.height = _this.screenWidth + 'px';
    },
    login() {
      this.leftnav = false;
    },
    logout() {
      localStorage.removeItem('myData');
    }
  },
  watch: {
    screenWidth (val) {
      this.screenWidth = val
    }
  },
  components: {
    fPlayView
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
  .leftshow-enter-active, .leftshow-leave-active
    transition all 0.5s;
  .leftshow-enter, .leftshow-leave-to
    opacity 0 
    transform translate(-100%, 0)
  .leftnav
    width 70%;
    height 100%;
    position fixed
    top 0
    background #20c7a2
    z-index 100
    color #e0e0e0
    text-align center
    .mypic
      width 100%
      .pic
        width f-rem(280px)rem
        height f-rem(280px)rem
        line-height f-rem(280px)rem
        font-size f-rem(60px)rem
        margin (f-rem(100px)rem) auto 0 auto
        background #fff
        border (f-rem(10px)rem) solid rgba(0, 0, 0, 0.2)
        border-radius 50%
        overflow hidden
        img
          width f-rem(280px)rem
          height f-rem(280px)rem
      .name
        line-height f-rem(80px)rem
        a
          color #e0e0e0
    .navlist
      width 60%
      margin auto
      .list
        padding (f-rem(50px)rem) 0
        .item
          padding (f-rem(32px)rem) 0
          font-size (f-rem(36px)rem)
          color #fff
    .logout
      width 80%
      height (f-rem(80px)rem)
      display inline-block
      border 0
      background rgba(255, 255, 255, 1)
      font-size (f-rem(32px)rem)
      color #20c7a2
</style>