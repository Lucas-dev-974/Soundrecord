import api from '../../services/ApiService'
import Playlist_List from '../PistPlaylist_List.vue'

export default{
    components: {
        Playlist_List
    },

    data(){
        return{
            dialog: false,
            search: '',
            localFile: null
        }
    },

    methods: {
        Upload: function(){
            if(this.localFile !== null){
                let formData = new FormData()
                formData.append('audio', this.localFile) // Add file
                formData.append('sessionid', this.$store.state.current_session.id) // Add the current Session ID

                // Send request with the form data
                api.post('/api/pists/', formData)
                .then(({data}) => {
                    console.log(data);

                    // console.log('imported in ? pist: ', data);
                    // this.$store.commit('push_PistPlaylist', data.Import)
                    this.$store.commit('push_PistPlaylist', data)
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
                console.log(pistid);
                this.$store.commit('remove_PistPlaylist', pistid)

            }).catch(error => console.log(error))
        },

        
        import_Microphone: function(){
            let microphonePist = {
                name: 'vois/micro',
                type: 'microphone',
                media: null,
                selected: true
            }
            this.$store.commit('push_Pist', microphonePist)
        },


    }
}