import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import router from '../src/router/index'
import { userLogin } from '../src/config/api'
import { setStore } from '../src/config/cookies'

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
    axios.get(`${userLogin}?phone=${textData.username}&password=${textData.password}`)
    .then(function (res) {
      if (res.data.code === 200) {
        setStore('loginData', res);
        commit('loginClick');
      }
    })
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
