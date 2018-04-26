import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  { path: '/', component: r => require.ensure([], () => r(require('../components/allMusicView')), 'allMusicView'), name: 'index', meta: { viewBl: true }},
  { path: '/login', component: r => require.ensure([], () => r(require('../components/loginView')), 'loginView'), name: 'login', meta: { viewBl: false }}
]

export default new Router({
  mode: 'history',
  routes
})