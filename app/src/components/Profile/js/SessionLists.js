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
        this.getSessions()
    },

    methods: {
        getSessions: async function(page = 0){
            let response = await  api.get('/api/sessions?page=' + page)
            if(response.status == 200){
                let totalpages = response.data.totalPages
                this.sessions  = response.data.datas
                return totalpages
            }else{
                console.log(response);
            }
        },

        openSession: function(sessionid){
            api.get('/api/session/' + sessionid).then(({data}) => {
                this.$store.commit('setCurrentSession', data.session)
                this.$router.push('/session')
            }).catch(error => console.log(error))
        },

        deleteSession: function(sessionid){
            if(this.delete_press.sessionid == null){
                this.delete_press.sessionid = sessionid
                this.delete_press.press = 1
                this.$store.commit('push_alert', {message: 'Confirmer la supression en reclickant', type: 'warning'})
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

        createSession: async function(name = ''){
            this.session_name = this.session_name ? this.session_name.replace(/[ ]+/g, "") : name.replace(/[ ]+/g, '')

            // If no session name 
            if(!this.session_name){
                this.$store.commit('push_alert', {message: 'Veuillez remplir le champs nom pour créer une session', type: 'warning', open: true})
            }else{
                // Send request and get data if error return false and push alert
                const response = await api.post('/api/session/', {name: this.session_name}).catch(error => { 
                    console.log(error) 
                    return false
                })
                if(response.status == 200){
                    console.log(response);
                    this.sessions.push(response.data)
                    this.on_add = false
                    this.$store.commit('appendSession', response.data)
                }

                return true
            }
        },


        update(prop, new_val, id){
            console.log(id);
            const index = this.sessions.findIndex(object => { return object.id === id });
            
            if(this.sessions[index][prop])
                this.sessions[index][prop] = new_val

            api.patch('/api/session', {id: id, prop: prop, new_val: new_val}).then(({data}) => {
                console.log(data);
            }).catch(error => {
                console.log(error);
            })
        }


    }


}