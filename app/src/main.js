import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import AudioVisual from 'vue-audio-visual'
require('./assets/style.css')

Vue.use(AudioVisual)
Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
