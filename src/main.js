import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vuex from 'vuex'
import App from './App.vue'
import store from './store'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
