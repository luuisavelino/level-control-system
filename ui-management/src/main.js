import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import Vuesax from 'vuesax'
import Datetime from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

import router from './router'
import store from './store'

import '@/assets/css/tailwind.css'
import 'vuesax/dist/vuesax.css'

Vue.config.productionTip = false
Vue.use(Router)
Vue.use(Vuesax)
Vue.use(Datetime)

// Vue.component('datetime', Datetime);

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')


