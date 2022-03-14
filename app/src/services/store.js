import Vuex from 'vuex'
import VuePersist from 'vuex-persist'
import Vue from 'vue'

import ApiService from './ApiService.js'

Vue.use(Vuex)
const vuexLocal = new VuePersist({
    storage: window.localStorage
})
export default new Vuex.Store({
    plugins: [vuexLocal.plugin],

    state:{
        current_session: null,
        is_mobile: false,

        token: null,
        user:  null,
        alerts: [],
        
        pist_playlist: [], // Bibliotheque
        sessions:      [], // all sessions created by user 
        pists:         [], // all pist for the current session

        main_audio: null,
        player: [],
        player_currentTime: 0,

        main_theme: 'bg-dark',
        WIDTH: null
    },

    mutations: {
        set_CurrentSession: function(state, session){ state.current_session = session },
        
        set_Sessions: function(state, data){ state.sessions = data },
        
        set_PistPlaylist: function(state, playlist){ state.pist_playlist = playlist },

        set_Token: function(state, token){ state.token = token },

        set_User: function(state, user){ state.user = user },

        set_Pists: function(state, pists){ state.pists = pists },
        
        set_IsMobile(state, value){ state.is_mobile = value },
        
        set_MainAudio: function(state, context){ state.main_audio = context  },  

        set_Player: function(state, player){ state.player = player },
        
        set_PlayerCurrentTime: function(state, time){ state.player_currentTime = time},

        set_PistParams: function(state, data){
            if(typeof(data.field) == 'string'){
                state.pists.forEach(pist => {
                    if(pist.id == data.pistid){
                        if(typeof(data.value) == 'string' && data.value.includes('||')){
                            console.log('split data');
                        }
                        state[data.field] = data.value
                    }
                })

            }
        },

        set_Width: function(state, width){ state.WIDTH = width },


        update_User: function(state, data){
            if(Object.keys(state.user).includes(data.field)){ state.user[data.field] = data.value }
        },

        
        push_Alert: function(state, alert){
            alert.id = state.alerts.length + 1
            state.alerts.push(alert)
        }, 
        remove_Alert: function(state, id){
            state.alerts = state.alerts.filter(alert => alert.id !== id)
        },
        

        push_Pist: function(state, pist){
            state.pists.push(pist)
        },
        update_Pist: function(state, data){
            state.pists.forEach((pist, key) => {
                if(pist.id == data.pistid){
                    state.pists[key][data.field] = data.value
                    // console.log('data value', data.value);
                    ApiService.patch('/api/importedin', {
                        pistid: data.pistid,
                        field: data.field,
                        value: `${data.value}`
                    }).catch(error => {
                        console.log(error);
                    })
                }
            });
        },
        remove_Pist: function(state, pistid){
            state.pist = state.pist.filter(importedIn => importedIn.id != pistid)
        },
        

        append_Session: function(state, session){ state.sessions.push(session) },
        update_Session: function(state, data){
            state.sessions.forEach((session, key) => {
                if(session.id == data.sessionid){
                    if(session.includes(data.field)){
                        state.sessions[key][data.field] = data.value
                    }
                }
            })
        },
        remove_Session: function(state, sessionid){
            state.Sessions = state.sessions.filter(session => session.id != sessionid)
        },


        push_PistPlaylist: function(state, pist){
            state.pist_playlist.push(pist)
        },
        remove_PistPlaylist: function(state, pist_id){
            state.pist_playlist = state.pist_playlist.filter(pist => pist.id != pist_id)
        },
    },

    actions:{
        get_pistdata: function(context, data){
            let toreturn
            context.state.pists.filter(imported => {
                if(imported.id === data.pistid){    
                    switch(data.field){
                        case 'volume':
                            toreturn = imported.volume
                            break
                    }
                }
            })
            return toreturn
        },
    }
})