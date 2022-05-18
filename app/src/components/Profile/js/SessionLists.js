import api from '../../../services/ApiService.js'
import Searchbar from '../../Searchbar.vue'

export default{
    components: {
        Searchbar
    },

    data(){
        return {
            sessions: [],

            on_add: false,
            session_name: '',
            
            delete_press: {
                sessionid: null,
                press: 0
            }
        }
    },

    mounted() {
        this.get_sessions()
    },

    methods: {
        get_sessions: async function(page = 0){
            let response = await  api.get('/api/sessions?page=' + page)
            if(response.status == 200){
                let totalpages = response.data.totalPages
                this.sessions  = response.data.datas
                return totalpages
            }else{
                console.log(response);
            }
        },

        open_session: function(sessionid){
            api.get('/api/session/' + sessionid).then(({data}) => {
                this.$store.commit('set_CurrentSession', data.session)
                this.$router.push('/session')
            }).catch(error => console.log(error))
        },

        delete_session: function(sessionid){
            if(this.delete_press.sessionid == null){
                this.delete_press.sessionid = sessionid
                this.delete_press.press = 1
                this.$store.commit('push_Alert', {message: 'Confirmer la supression en reclickant', type: 'warning'})
            }else if(this.delete_press.sessionid == sessionid){
                api.delete('/api/session/' + sessionid).then(({data}) => {
                    data
                    this.sessions = this.sessions.filter(session => session.id != sessionid)
                    this.delete_press = {
                        sessionid: null,
                        press: 0
                    }       
                }).catch(error => console.log(error))
                
            }else{
                this.delete_press = {
                    sessionid: null,
                    press: 0
                }
            }
        },

        create_session: function(name = ''){
            // console.log(name);
            this.session_name = this.session_name ? this.session_name.replace(/[ ]+/g, "") : name.replace(/[ ]+/g, '')


            if(!this.session_name){
                this.$store.commit('push_Alert', {message: 'Veuillez remplir le champs nom pour créer une session', type: 'warning', open: true})
            }else{
                api.post('/api/session/', {name: this.session_name})
                .then(({data}) => {
                    console.log(data);
                    this.sessions.push(data)
                    this.on_add = false
                    this.$store.commit('append_Session', data)
                    
                }).catch(error => {
                    console.log(error);
                })
            }
        },


    }


}