import Sidebar from '../../components/Sidebar.vue'
import AudiosController from '../../components/AudiosController.vue'
import PistContainer  from '../../components/PistManager.vue'

export default{
    components: {
        Sidebar, AudiosController, PistContainer
    },
    
    data(){
        return{
            session_name: '',
            
        }
    },

    mounted(){

    }
}