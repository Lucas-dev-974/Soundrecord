import Vue from 'vue';
import VueRouter from 'vue-router';

// Views
import Home from './views/home.vue'
import Auth from './views/Auth.vue'

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',  
            name: 'home',
            component: Home,
        },

        {
            path: '/authentication',
            name: 'authentication',
            component: Auth
        }
    ],

})

export default router