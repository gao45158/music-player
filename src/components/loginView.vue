<template>
  <div class="login">
    <div class="login-wapper">
      <input type="text" name="username" v-model="userData.username">
      <input type="password" name="password" v-model="userData.password">
      <button @click="login">登录</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, actions } from "vuex";

export default {
  name: "loginview",
  data() {
    return {
      userData: {
        username: "",
        password: ""
      }
    };
  },
  created () {
    var data;
    var _this = this;
    for (var item in window.localStorage) {
      if (item === 'myData') {
        data = JSON.parse(localStorage.myData);
      }
    }
    if (data) {
      axios.get(`http://localhost:3000/login/cellphone?phone=${data.username}&password=${data.password}`).then(function(res) {
        if (res.data.code == 200) {
          _this.$store.dispatch("login", data);
        } else {
          console.log('帐号或密码错误')
        } 
      })
    }
  },
  methods: {
    login() {
      localStorage.setItem('myData',JSON.stringify(this.userData))
      this.$store.dispatch("login", this.userData);
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
    background: #f60;
</style>
