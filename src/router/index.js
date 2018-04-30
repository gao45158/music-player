import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  { path: '/', component: r => require.ensure([], () => r(require('../components/allMusicView')), 'all'), name: 'index', meta: { viewBl: true }},
  { path: '/login', component: r => require.ensure([], () => r(require('../components/loginView')), 'login'), name: 'login', meta: { viewBl: false }},
  { path: '/tplay', component: r => require.ensure([], () => r(require('../components/tPlayView')), 'tplay'), name: 'tplay', meta: { viewBl: true }}
]

export default new Router({
  mode: 'history',
  routes
})