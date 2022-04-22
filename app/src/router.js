import Vue from 'vue';
import VueRouter from 'vue-router';

// Views
import Session from './views/Session.vue'
import Auth from './views/Auth.vue'
import Profile   from './views/profile.vue'

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',  
            name: 'profile',
            component: Profile,
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
        }
    ],

})

export default router