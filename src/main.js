import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueApexCharts from 'vue-apexcharts'
import VueChartkick from 'vue-chartkick'
import  'chart.js';
import 'hchs-vue-charts'

import VueTheMask from 'vue-the-mask'
Vue.use(VueTheMask)


Vue.use(VueChartkick)
Vue.use(VueSweetalert2);
Vue.use(VueApexCharts)
Vue.component('apexchart-', VueApexCharts)



Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
