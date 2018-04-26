// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MintUI from 'mint-ui'
import VueTouch from 'vue-touch'
import App from './App'
import router from './router'
import store from '../store/index'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)
Vue.use(VueTouch, {name: 'v-touch'})

router.beforeEach(function (to, from, next) {
  const nextRoute = ['tplay']; 
  const auth = store.state.loginOf;
  if (nextRoute.indexOf(to.name) >= 0) {  
    if (!auth) {
      router.push({name: 'login'})
    }
  };
  if (to.name === 'login') {
    if (auth) {  
      router.push({name: 'index'});  
    }  
  };
  next();  
});  

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})