require('../../assets/style-dashboard.css')

import api           from '../../services/ApiService'
import Delete        from '../../components/DeleteConfirmation.vue'
import CreateSession from '../../components/CreateSession.vue'
import Playlist_List from '../../components/Session/PistPlaylist_List.vue'

export default {
    components: {
        Delete, CreateSession, Playlist_List
    },

    data(){
        return {
            email: this.$store.state.user.email,
            name:  this.$store.state.user.name, 
        }
    },


    mounted(){
        this.init()
    },

    methods: {
        init: function(){
            api.get('/api/sessions').then(({data}) => {
                console.log(data);
                this.$store.commit('set_Sessions', data.sessions)
            })
               .catch(error => console.log(error))

            api.get('/api/pists').then(({data}) => this.$store.commit('set_PistPlaylist', data))
               .catch(error => console.log(error))
        },  

        openSession: function(session){
            api.get('/api/session/' + session)
               .then(({data}) => {
                 this.$store.commit('set_CurrentSession', data.session)
                 this.$router.push('/')
               }).catch(error => console.log(error))
        },

        updateUser: function(){
            if(this.email != this.$store.state.user.email) console.log('update email');
            if(this.name  != this.$store.state.user.name){
                api.patch('/api/users/', {
                    fields: 'name|',
                    datas:  this.name + '|',
                }).then(({data}) => {
                    data
                    this.$store.commit('update_User', {  field: 'name', value: this.name })

                    this.$store.commit('push_Alert', {
                        open: true,
                        message: 'Votre nom à bien été modifier',
                        type: 'success'
                    })
                }).catch(error => {
                    console.log(error);
                })
            }
        },

        logout: function(){
            this.$store.commit('set_Token', '')
            window.location.href = '/authentication'
        }
    }
}