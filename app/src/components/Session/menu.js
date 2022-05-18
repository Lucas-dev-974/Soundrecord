import api from '../../services/ApiService'
import { player } from '../../services/Player'
import Bibliotheque from '../Profile/Bibliotheque.vue'
// import got from 'got/dist/source'

export default{
    components: { Bibliotheque },

    data(){
        return{
            dialog: false,
            search: '',
            localFile: null,

            pists: []
        }
    },

    async mounted() {
        await this.get_pists()
    },

    methods: {
        get_pists: async function(){
            await api.get('/api/pists').then(({data}) => {
                this.pists = [...data.datas]
            }).catch(error => {
                console.log(error);
            })
        },

        Upload: function(){
            if(this.localFile !== null){

                // Create form to send file
                let formData = new FormData()
                formData.append('audio', this.localFile) // Add file
                formData.append('sessionid', this.$store.state.current_session.id) // Add the current Session ID

                // Send request with the form data
                api.post('/api/pist', formData)
                .then(({data}) => {
                    this.$store.commit('push_PistPlaylist', data.Import)
                    this.$store.commit('push_Pist', data.Pist)
                    // player.addTrack(this.localFile)
                    console.log(data);
                    // player.addTrack({
                    //     src: src,
                    //     name: toImport.name,
                    //     api_options: {...toImport}
                    // })
                }).catch(error => {
                    console.log(error);
                })
            }
        },

        handle_LocalFile: function(event){
            this.localFile = event.target.files[0]
            this.Upload()
        },

        delete_Pist: function(pistid){   
            api.delete('/api/pist/' + pistid).then(() => {
                this.$store.commit('remove_PistPlaylist', pistid)
            }).catch(error => console.log(error))
        },

        import_Microphone: function(){
            
        },

        import_PistInSession: function(pist){
            let toImport
            api.post('/api/session_track', {sessionid: this.$store.state.current_session.id, importid: pist.id})
            .then(async (data) => { 
                const src = api.defaults.baseURL + data.data.src + '?token=' + this.$store.state.token
                toImport = data.data 
                toImport.src = src
                player.add_track({
                    src: src,
                    name: toImport.name,
                    api_options: {...toImport}
                })
            }).catch(error => console.log(error))
              
        },

    }
}