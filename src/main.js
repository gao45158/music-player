// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueTouch from 'vue-touch'
import store from '../store/index'

Vue.use(VueTouch, {name: 'v-touch'})

// router.beforeEach(function (to, from, next) {
//   const nextRoute = ['index'];  
//   const auth = store.state.loginOf; 
//   if (nextRoute.indexOf(to.name) >= 0) {  
//     if (!auth) {
//       router.push({name: 'login'})
//     }
//   }  
//   //已登录的情况再去登录页，跳转至首页  
//   if (to.name === 'login') {
//     if (auth) {  
//       router.push({name: 'index'});  
//     }  
//   }  
//   next();  
// });  

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})