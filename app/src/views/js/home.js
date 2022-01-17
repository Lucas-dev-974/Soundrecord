import Sidebar from '../../components/Sidebar.vue'
import AudiosController from '../../components/AudiosController.vue'
import PistContainer  from '../../components/PistManager.vue'
import ApiService from '../../services/ApiService'
// import Api from '../../services/Api'

export default{
    components: {
        Sidebar, AudiosController, PistContainer,
    },
    
    data(){
        return{
            id: null,
            session_name: '',
            imported_pists: [],
            text: "",
        }
    },

    mounted(){
        this.load()
        this.checkScreen()
        window.addEventListener('resize', this.checkScreen)
    },
    
    methods: {
        load: function(){
            let params
            if(this.$store.state.currentSession != null)
                params = {params: { id: this.$store.state.currentSession.id}}
            else params = {}
            
            ApiService.get('/api/sessions/', params)
            .then(({data}) => {
                this.$store.commit('set_currentSession', data)
            }).catch(error => {
                console.log(error);
            })

        },

        checkScreen: function(){
            if(window.screen.width > 600){
                this.is_mobile = false
                this.$store.commit('setIsMobile', false)
            }else{
                this.$store.commit('setIsMobile', true)
            }
        }
    }
}