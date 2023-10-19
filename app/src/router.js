import Vue from "vue";
import VueRouter from "vue-router";

// Views
import Authentication from "./views/authentication/Authentication.vue";
import Discover from "./views/discover/Discover.vue";
import Profile from "./views/profile/Profile.vue";
import Studio from "./views/Studio/Studio.vue";

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
      path: "/authentication",
      name: "authentication",
      component: Authentication,
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
