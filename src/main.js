import Vue from 'vue'
import App from './App.vue'
import router from './router'
import FastClick from 'fastclick'

import '@/assets/style/common.css'
import "@/assets/style/theme.scss";
FastClick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  render: h => h(App),
}).$mount('#app')
