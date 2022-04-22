if(!window.localStorage.getItem('vuex')) window.localStorage.setItem('vuex', '{}')

import Vue from 'vue'
import vuetify from './plugins/vuetify'
import AudioVisual from 'vue-audio-visual'
import store from './Store/store'
import Router from './router'
import Layout from './layout.vue'

if(window.location.pathname == '/authentication') { 
  // Load auth css and js for animation only if user is in the auth page
  require('./assets/auth.js')
  require('./assets/auth.css')
}

require('./assets/style.css')
require('./assets/style-dashboard.css')

Vue.use(AudioVisual)

 // If data is not used bypass warning
Vue.config.productionTip = true

window.addEventListener('resize', () => {
  store.commit('set_Width', window.innerWidth)
})  

new Vue({
  vuetify,
  store: store,
  router: Router,
  render: h => h(Layout)
}).$mount('#app')
