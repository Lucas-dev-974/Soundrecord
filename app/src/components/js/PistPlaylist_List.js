import Delete from '../DeleteConfirmation.vue'
import api from '../../services/ApiService.js'

export default{
    components: { Delete },

    data(){
        return {
            
        }
    },

    methods: {
        import_PistInSession: function(pist){
            api.post('/api/importedIn/', {sessionid: this.$store.state.current_session.id, pistid: pist.id})
            .then(({data}) => {
                this.$store.commit('push_Pist', data)
            }).catch(error => console.log(error))
        }   
    }
}