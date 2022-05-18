import Vue from 'vue';
import VueRouter from 'vue-router';

// Views
import Session from './views/Session.vue'
import Auth from './views/Auth.vue'
import Profile   from './views/profile.vue'
import Discover from  './views/Discover.vue'

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',  
            name: 'home',
            component: Discover,
        },

        {
            path: '/authentication',
            name: 'authentication',
            component: Auth
        },

        {
            path: '/profile',
            name: 'profile',
            component: Profile
        },

        {
            path: '/session',
            name: 'session',
            component: Session
        },
        
        {
            path: '/discover',
            name: 'discorver',
            component: Discover
        },
    ],

})

export default router