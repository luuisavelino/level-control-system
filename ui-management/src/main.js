import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import Vuesax from 'vuesax'
import Datetime from 'vue-datetime'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import 'vue-datetime/dist/vue-datetime.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '@/assets/css/tailwind.css'
import 'vuesax/dist/vuesax.css'

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false
Vue.use(Router)
Vue.use(Vuesax)
Vue.use(Datetime)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')


