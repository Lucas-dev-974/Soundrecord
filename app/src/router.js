import Vue from 'vue';
import VueRouter from 'vue-router';

// Views
import Session from './views/Session.vue'
import Auth from './views/Auth.vue'
import Dashboard from './views/Dashboard.vue'

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',  
            name: 'session',
            component: Session,
        },

        {
            path: '/authentication',
            name: 'authentication',
            component: Auth
        },

        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard
        }
    ],

})

export default router