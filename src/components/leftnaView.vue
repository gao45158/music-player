<template>
  <transition name="leftshow">
    <div v-show="lnav" class="leftnav">
      <div class="mypic">
        <div class="pic" v-if="pic"><img :src="pic" alt=""></div>
        <div class="pic" v-else>头像</div>
        <div class="name" v-if="name">{{ name }}</div>
        <div v-else class="name" @click="loginCk">
          <router-link to="/login">您还未登录，点击登录</router-link>
        </div>
      </div>
      <div class="navlist">
        <ul class="list">
          <li class="item">全部音乐</li>
          <li class="item">最近循环</li>
          <li class="item">我的最爱</li>
        </ul>
      </div>
      <button class="logout" v-show="name" @click="logout">退出登录</button>
    </div>
  </transition>
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
      loginCk() {
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
