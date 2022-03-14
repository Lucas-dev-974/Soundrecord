import Sidebar from '../../components/Sidebar.vue'
import AudiosController from '../../components/AudiosController.vue'
import PistContainer  from '../../components/PistManager.vue'
import ApiService from '../../services/ApiService'
// import api from '../../services/ApiService'

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
        this.checkScreen()
        window.addEventListener('resize', this.checkScreen)
    },
    
    methods: {
        checkScreen: function(){
            if(window.screen.width > 600){
                this.is_mobile = false
                this.$store.commit('setIsMobile', false)
            }else{
                this.$store.commit('setIsMobile', true)
            }
        },

        loadData: function(){
            ApiService
        }
    }
}