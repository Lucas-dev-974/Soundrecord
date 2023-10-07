if (!window.localStorage.getItem("vuex"))
  window.localStorage.setItem("vuex", "{}");

import Vue from "vue";
import vuetify from "./plugins/vuetify";
import AudioVisual from "vue-audio-visual";
import store from "./Store/store";
import router from "./router";
import Layout from "./layout.vue";

import "./assets/style.css";
import "./assets/style-dashboard.css";

Vue.use(AudioVisual);

// If data is not used bypass warning
Vue.config.productionTip = true;

window.addEventListener("resize", () => {
  store.commit("setWidth", window.innerwidth);
});
new Vue({
  vuetify,
  store: store,
  router,
  render: (h) => h(Layout),
}).$mount("#app");
