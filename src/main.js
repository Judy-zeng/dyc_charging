import Vue from 'vue'
import App from './App.vue'
import router from './router'
import FastClick from 'fastclick'

import './router/permission'

import '@/components/Loading/index.css'
import Loading from '@/components/Loading/index'

import '@/assets/style/common.css'
import "@/assets/style/theme.scss";

FastClick.attach(document.body)

Vue.use(Loading)

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    render: h => h(App),
}).$mount('#app')
