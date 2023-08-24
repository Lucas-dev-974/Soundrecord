import Vue from "vue";
import VueRouter from "vue-router";

// Views
import Authentication from "./views/authentication/Authentication.vue";
import Discover from "./views/discover/Discover.vue";
import Session from "./views/Session.vue";
import Profile from "./views/profile/Profile.vue";

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
      path: "/session",
      name: "session",
      component: Session,
    },
  ],
});

export default router;
