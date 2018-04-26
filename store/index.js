import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import router from '../src/router/index'
import { userLogin } from '../src/config/api'
import { setStore } from '../src/config/cookies'
import { Toast } from 'mint-ui'

Vue.use(Vuex);

const state = {
  loginOf: false,
  userProfile: null
}

const mutations = {
  loginClick(state) {
    location.reload();
  },
  login(state, ld) {
    state.loginOf = true;
    state.userProfile = ld;
    router.push({name: 'index'});
  },
  isPerv() {
    router.push({name: 'index'});
  }
}

const actions = {
  loginClick({commit}, textData) {
    if (textData.username === '' && textData.password === '') {
      Toast({
        message: '帐号密码不能为空',
        position: 'top',
        duration: 1500
      });
    } else {
      axios.get(`${userLogin}?phone=${textData.username}&password=${textData.password}`)
      .then(function (res) {
        if (res.data.code === 200) {
          setStore('loginData', res);
          Toast({
            message: '登录成功',
            position: 'top',
            duration: 1000
          });
          setTimeout(commit('loginClick'), 2000);
        } else {
          Toast({
            message: '帐号或密码错误',
            position: 'top',
            duration: 1500
          });
        }
      })
    }
  },
  login({commit}, ld) {
    commit('login', ld);
  },
  isPerv({commit}) {
    commit('isPerv');
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
