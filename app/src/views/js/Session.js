import Sidebar        from '../../components/Sidebar.vue'
import BarManager       from '../../components/Session/BarManager.vue'
import PistContainer  from '../../components/Session/PistManager.vue'

import api from '../../services/ApiService'

import { player } from '../../services/Player'

export default{
    components: {
        Sidebar, BarManager, PistContainer,
    },

    data(){
        return{
            imported_pists: null,
            track_loaded: false
        }
    },
    
    async mounted(){  
        if(this.$store.state.current_session){
            await this.loadImportedPist()
            window.addEventListener('resize', this.checkScreen)
            this.checkScreen()
        }else this.$router.push('profile')

    },
    
    methods: {

        checkScreen: function(){
            if(window.screen.width > 600){
                  this.is_mobile = false
                  this.$store.commit('set_IsMobile', false)
            }else this.$store.commit('set_IsMobile', true)
        },

        loadImportedPist: function(){
            api.get('/api/session_track/' + this.$store.state.current_session.id)
                .then(({data}) => {
                    console.log(data);
                    this.imported_pists = data
                    this.format_pists()
                }).catch(error => {
                    console.log(error);
                })
        },

        play_Pists: function(){
            player.getEventEmitter().emit('play')
        },

        pause_Pists: function(){
            player.getEventEmitter().emit('pause')
        },

        format_pists: async function(){ // To format the selected pist as library is asking
            let formated_pists = []

            this.imported_pists.forEach(pist => {
                let pist_ = {
                    id: pist.id,
                    Importid: pist.ImportId,
                    src: "http://localhost:3000/api/pist/"+ pist.importid +"?token=" + this.$store.state.token,
                    name: pist.Import.name,
                    gain: pist.volume,
                    muted: !pist.selected,
                    customClass: 'WaveLine',
                    pistColor: pist.color,
                }
                formated_pists.push(pist_)
            })

            this.$store.commit('set_Pists', formated_pists)
            
            player.init_Player()
            
            player.laodTrack().then(() => {
                console.log('loaded');
                this.track_loaded = true
            })
        }
    }
}