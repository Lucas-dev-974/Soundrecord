import api from '../../services/ApiService'
import { player } from '../../services/Player'
import Bibliotheque from '../Profile/Bibliotheque.vue'
// import got from 'got/dist/source'

export default{
    name: 'session_menu',
    components: { Bibliotheque },

    data(){
        return{
            dialog: false,
            search: '',
            localFile: null,

            pists: []
        }
    },

    mounted() {
        this.getPists()
    },

    methods: {
        getPists: async function(){
            const response = await api.get('/api/pists').catch(error => console.log(error))
            if(response.status == 200){
                // Setup all imported pist in local storage biblio
                this.$store.commit('setBiblio', response.data.datas)
            }
        },

        Upload: async function(){
            if(this.localFile !== null){

                // Create form to send file
                let form_data = new FormData()
                form_data.append('audio', this.localFile) // Add file
                form_data.append('sessionid', this.$store.state.current_session.id) // Add the current Session ID

                // Send request with the form data
                const response = await api.post('/api/pist', form_data).catch(error => console.log(error))
                if(response.status == 200){
                    this.$store.commit('pushInBiblio', response.data.import)
                    player.add_track({
                        src: response.data.session_track.src + '?token=' + this.$store.state.token,
                        name: response.data.import.name,
                        api_options: {
                            ...response.data.session_track,
                        }
                    })
                }
            }
        },

        handleFileToUpload: function(event){
            this.localFile = event.target.files[0]
            this.Upload()
        },

        deletePist: function(pistid){   
            api.delete('/api/pist/' + pistid).then(() => {
                this.$store.commit('removeInBiblio', pistid)
            }).catch(error => console.log(error))
        },

        importMicrophone: function(){
            player.addMicrophone()
        },

        importPistInSession: async function(pist){
            const response = await api.post('/api/session_track', {sessionid: this.$store.state.current_session.id, audioid: pist.id}).catch(error => console.log(error))
            if(response.status == 200){
                const src = api.defaults.baseURL + response.data.src + '?token=' + this.$store.state.token
                player.add_track({
                    ...response.data,
                    src: src,
                    api_options: {
                        id:   response.data.id,
                        name: response.data.name,
                        src:  response.data.src,
                        sessionid: response.data.sessionid,
                        color:     response.data.color,
                        audioid:  response.data.audioid
                    }
                })
            }
        },
    }
}