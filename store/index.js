import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex);

const state = {
    userDetail: null
}

const mutations = {
    login(state, res) {
        state.userDetail = res;
    }
}

const actions = {
    login({commit}, data) {
        axios.get(`http://localhost:3000/login/cellphone?phone=${data.username}&password=${data.password}`).then(function(res) {
            if (res.data.code == 200) {
                commit('login', res.data)
            } else {
                console.log('帐号或密码错误')
            } 
        })
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})