import Vuex from 'vuex'
import VuePersist from 'vuex-persist'
import Vue from 'vue'

Vue.use(Vuex)
const vuexLocal = new VuePersist({
    storage: window.localStorage
})
export default new Vuex.Store({
    plugins: [vuexLocal.plugin],

    state:{
        token: null,
        user:  null,
        alerts: [],

        Sessions: [],
        Bibliotheque: [],

        currentSession: null,

    },

    mutations: {
        set_token: function(state, token){
            state.token = token
        },
        set_user: function(state, user){
            state.user = user
        },

        push_alert: function(state, alert){
            alert.id = state.alerts.length + 1
            state.alerts.push(alert)
        },

        remove_alert: function(state, id){
            state.alerts = state.alerts.filter(alert => alert.id !== id)
        },
        
        set_currentSession: function(state, session){
            state.currentSession = session
        }
        
        // add_session: function(state, session){

        // },

        // delete_session: function(state, session){

        // }
    }
})