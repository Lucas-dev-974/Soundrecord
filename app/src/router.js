import Vue from "vue";
import VueRouter from "vue-router";

// Views

import Discover from "./views/discover/Discover.vue";
import Profile from "./views/profile/Profile.vue";
import Studio from "./views/Studio/Studio.vue";
import Register from "./views/authentication/Register.vue";
import Login from "./views/authentication/Login.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Discover,
    },

    {
      path: "/login",
      name: "login",
      component: Login,
    },

    {
      path: "/register",
      name: "register",
      component: Register,
    },

    {
      path: "/profile",
      name: "profile",
      component: Profile,
    },

    {
      path: "/studio",
      name: "studio",
      component: Studio,
    },
  ],
});

export default router;
