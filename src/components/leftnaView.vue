<template>
  <div>
    <transition name="bgshow">
      <v-touch class="left-bg" v-show="lnav" @swipeleft="hide" @tap="hide"></v-touch>
    </transition>
    <transition name="leftshow">
      <v-touch v-show="lnav" class="leftnav" @swipeleft="hide">
        <div class="mypic">
          <div class="pic" v-if="pic"><img :src="pic" alt=""></div>
          <div class="pic" v-else>头像</div>
          <div class="name" v-if="name">{{ name }}</div>
          <div v-else class="name" @click="hide">
            <router-link to="/login">您还未登录，点击登录</router-link>
          </div>
        </div>
        <div class="navlist">
          <ul class="list">
            <li @click="hide" class="item"><router-link to="/tplay">全部音乐</router-link></li>
            <li @click="hide" class="item"><router-link to="/tplay">最近循环</router-link></li>
            <li @click="hide" class="item"><router-link to="/tplay">我的最爱</router-link></li>
          </ul>
        </div>
        <button class="logout" v-show="name" @click="logout">退出登录</button>
      </v-touch>
    </transition>
  </div>
</template>

<script>
  import { getStore, reStore } from '../config/cookies'

  export default {
    name: 'leftnaView',
    props: ['lnav'],
    data() {
      return {
        name: '', // 用户昵称
        pic: '' // 用户头像
      }
    },
    mounted () {
      const ld = JSON.parse(getStore('loginData'));
      if (ld) {
        this.name = ld.data.profile.nickname;
        this.pic = ld.data.profile.avatarUrl;
      };
    },
    methods: {
      hide() { 
        this.$emit('lnav', false); 
      },
      logout() {
        reStore('loginData');
        location.reload();
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '../common/css/rem';

  .bgshow-enter-active, .bgshow-leave-active
    transition all 0.8s;
  .bgshow-enter, .bgshow-leave-to
    opacity 0 
  .leftshow-enter-active, .leftshow-leave-active
    transition all 0.5s;
  .leftshow-enter, .leftshow-leave-to
    opacity 0 
    transform translate(-100%, 0)
  .left-bg
    width 100%;
    height 100%;
    position fixed
    top 0
    background rgba(0, 0, 0, 0.9)
    z-index 25
  .leftnav
    width 70%;
    height 100%;
    position fixed
    top 0
    background #c10d0c
    z-index 100
    color #e0e0e0
    text-align center
    box-shadow f-rem(30) 0 f-rem(100) #000
    .mypic
      width 100%
      .pic
        width f-rem(280)
        height f-rem(280)
        line-height f-rem(280)
        font-size f-rem(60)
        margin f-rem(100) auto 0 auto
        background #fff
        border f-rem(10) solid rgba(0, 0, 0, 0.2)
        border-radius 50%
        overflow hidden
        img
          width f-rem(280)
          height f-rem(280)
      .name
        line-height f-rem(120)
        a
          color #e0e0e0
    .navlist
      width 60%
      margin auto
      .list
        padding f-rem(50) 0
        .item
          padding f-rem(32) 0
          font-size f-rem(36)
          a
            color #fff
    .logout
      width 80%
      height f-rem(80)
      line-height f-rem(80)
      border-radius f-rem(12)
      display inline-block
      border 0
      background rgba(255, 255, 255, 0.8)
      font-size f-rem(32)
      color #c10d0c
</style>
