import Delete from '../DeleteConfirmation.vue'
import api from '../../services/ApiService.js'

// import { player } from '../../services/Player.js'

export default{
    components: { Delete },

    data(){
        return {
            imported: null
        }
    },

    mounted(){
        console.log(this.$store.state.pist_playlist);
    },
    methods: {
        import_PistInSession: async function(pist){
            let _this = this
            await api.post('/api/session_track', {sessionid: this.$store.state.current_session.id, importid: pist.id})
                .then(({data}) => {
                    _this.imported = data
                }).catch(error => console.log(error))
            this.url2blob()
        },

        url2blob: async function(){
            try{
                const data = await api(this.imported.src)
                console.log(data.data);
        
            }catch(error){
                console.log(error);
            }
        }
    }
}