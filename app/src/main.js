import Vue from 'vue'
import vuetify from './plugins/vuetify'
import AudioVisual from 'vue-audio-visual'
import Storage from './services/store'
import Router from './router'
import Layout from './layout.vue'

require('./assets/style.css')

if(window.location.pathname == '/authentication') { 
  // Load auth css and js for animation only if user is in the auth page
  require('./assets/auth.js')
  require('./assets/auth.css')
}

Vue.use(AudioVisual)

 // If data is not used bypass warning
Vue.config.productionTip = false

new Vue({
  vuetify,
  store: Storage,
  router: Router,
  render: h => h(Layout)
}).$mount('#app')
