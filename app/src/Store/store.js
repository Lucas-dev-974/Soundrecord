import Vuex from 'vuex'
import VuePersist from 'vuex-persist'
import Vue from 'vue'

import {profile_settings} from './profile'
import {sessions, current_session} from './sessions'

Vue.use(Vuex)
const vuexLocal = new VuePersist({ storage: window.localStorage })

let initialstate = {
    current_session: current_session,
    sessions: sessions, // all sessions created by user 
    audios: [], // Last audios retrieved from api server
    biblio: [], // Bibliotheque

    user:  null,

    // TODO: Use cookie insteand of store the token in the local storage
    token: null,
    alerts: [],

    main_theme: 'bg-dark',
    width: null,

    profile_settings: {...profile_settings},
    theme: 'dark',

    // ? ---------------------

    commentsPanel: {
        audioid: 0,
        audio: {
            id: null,
        },
        open: false,
    }
}

export default new Vuex.Store({
    plugins: [vuexLocal.plugin],

    state:{ ...initialstate },

    mutations: {
        setCurrentSession: function(state, session){ state.current_session = session },
        
        setSessions: function(state, data){ state.sessions = data },
        
        setPistPlaylist: function(state, playlist){ state.biblio = playlist },

        setToken: function(state, token){ state.token = token },

        setUser: function(state, user){ state.user = user },

        setWidth: function(state, width){ state.width = width },

        updateUser: function(state, data){
            if(Object.keys(state.user).includes(data.field)){ state.user[data.field] = data.value }
        },

        push_alert: function(state, alert){
            alert.id = state.alerts.length + 1
            state.alerts.push(alert)
        },

        remove_alert: function(state, id){
            state.alerts = state.alerts.filter(alert => alert.id !== id)
        },    

        appendSession: function(state, session){ state.sessions.push(session) },
        updateSession: function(state, data){
            state.sessions.forEach((session, key) => {
                if(session.id == data.sessionid){
                    if(session.includes(data.field)){
                        state.sessions[key][data.field] = data.value
                    }
                }
            })
        },
        removeSession: function(state, sessionid){
            state.Sessions = state.sessions.filter(session => session.id != sessionid)
        },

        setBiblio: function(state, pists){
            state.biblio = pists
        },
        pushInBiblio: function(state, pist){
            state.biblio.push(pist)
        },
        removeInBiblio: function(state, pist_id){
            state.biblio = state.biblio.filter(pist => pist.id != pist_id)
        },

        pusProfileSettings: function(state, settings){
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
        updateProfileSettings: function(state, data){
            if(profile_settings.includes(data.field)) state.profile_settings[data.field] = data.value
         },

        logout: function(state){
            Object.assign(state, initialstate)
            window.location.href = '/authentication'
        },

        // ? ---------------------------
        toggleCommentsPanel: function(state, data = null){
            if(data != null) state.commentsPanel.open
            else state.commentsPanel.open = !state.commentsPanel.open
        },

        setCommentsPanelAudio(state, audio){
            state.commentsPanel.audio = audio
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