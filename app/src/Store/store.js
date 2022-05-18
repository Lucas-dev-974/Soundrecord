import Vuex from 'vuex'
import VuePersist from 'vuex-persist'
import Vue from 'vue'

import ApiService from '../services/ApiService.js'

Vue.use(Vuex)
const vuexLocal = new VuePersist({
    storage: window.localStorage
})

let initialstate = {
    current_session: null,
    pist_playlist: [], // Bibliotheque
    sessions:      [], // all sessions created by user 
    pists:         [], // all pist for the current session

    user:  null,
    token: null,
    alerts: [],

    main_theme: 'bg-dark',
    WIDTH: null,

    profile_settings: {
        'banner-img': null,
        'banner-color': null,
        'show': [],
    }
}

export default new Vuex.Store({
    plugins: [vuexLocal.plugin],

    state:{ ...initialstate },

    mutations: {
        set_CurrentSession: function(state, session){ state.current_session = session },
        
        set_Sessions: function(state, data){ state.sessions = data },
        
        set_PistPlaylist: function(state, playlist){ state.pist_playlist = playlist },

        set_Token: function(state, token){ state.token = token },

        set_User: function(state, user){ state.user = user },

        set_Pists: function(state, pists){ state.pists = pists },

        set_MainAudio: function(state, context){ state.main_audio = context  },  

        set_Player: function(state, player){ state.player = player },
        
        set_PlayerCurrentTime: function(state, time){ state.player_currentTime = time},

        set_PlayerGlobalVolume: function(state, volume){ state.player_g_volume = volume},
        
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
                    
                    ApiService.patch('/api/session_track', {
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
            state.pists = state.pists.filter(session_track => session_track.id != pistid)
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

        push_profile_settings: function(state, settings){
            for(const setting in settings){
                if(Object.keys(state.profile_settings).includes(setting)){
                    state.profile_settings[setting] = settings[setting]
                }
                else{
                    state.profile_settings = {
                        ...state.profile_settings,
                        [setting]: settings[setting]
                    }
                }
            }
        },

        logout: function(state){
            Object.assign(state, initialstate)
            window.location.href = '/authentication'
        }
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