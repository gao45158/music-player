<template>
  <div class="login">
    <div class="login-wapper">
      <input type="text" name="username" v-model="userText.username">
      <input type="password" name="password" v-model="userText.password">
      <button @click="login">登录</button>
      <button @click="pervCk">返回</button>
    </div>
  </div>
</template>

<script>
import { getStore } from '../config/cookies'

export default {
  name: "loginview",
  data() {
    return {
      userText: {
        username: "",
        password: ""
      }
    };
  },
  mounted() {
    const ld = JSON.parse(getStore('loginData'));
    if (ld) {
      this.$store.dispatch('login', ld);
    }
  },
  methods: {
    login() {
      this.$store.dispatch("loginClick", this.userText);
    },
    pervCk() {
      this.$store.dispatch("isPerv");
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import '../common/css/rem.styl';

  .login
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: #20c7a2;
    z-index 102
    .login-wapper
      padding 0 (f-rem(120px)rem)
      position fixed
      left 0
      top 50%
      margin-top -(f-rem(240px)rem)
      input 
        width 100%
        height f-rem(80px)rem
        border 0
        background rgba(0, 0, 0, 0.2)
        margin 0 0 (f-rem(40px)rem) 0
        padding 0 (f-rem(20px)rem)
        box-sizing border-box
        color #fff
      button
        width 100%
        height f-rem(80px)rem
        border 0
        background #fff
        margin 0 0 (f-rem(40px)rem) 0
        border-radius (f-rem(12px)rem)
</style>
