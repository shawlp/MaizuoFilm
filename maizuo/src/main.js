// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.config.productionTip = false;

Vue.use(MintUI);

// 自定义滚动指令
Vue.directive('scroll',{
  bind:function(el,binding){
    window.addEventListener('scroll',() => {
        let fnc = binding.value;
        fnc(el);
    })
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})