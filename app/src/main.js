import Vue from 'vue'
import vuetify from './plugins/vuetify'
import AudioVisual from 'vue-audio-visual'
import Storage from './services/store'
import Router from './router'
import Layout from './layout.vue'

require('./assets/style.css')

Vue.use(AudioVisual)
Vue.config.productionTip = false

new Vue({
  vuetify,
  store: Storage,
  router: Router,
  render: h => h(Layout)
}).$mount('#app')
