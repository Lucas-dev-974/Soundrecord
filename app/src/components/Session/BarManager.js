import VolumeController from './VolumeController.vue'
import PistPlaylist     from './PistPlaylist.vue'

import { player } from '../../services/Player'

export default{
    components: {
        VolumeController, PistPlaylist
    },

    data(){
        return{
            play: false,
            in_record: false,
            in_play: false,

            responsive: {
                g_volumeWidth: '200px',
            },

            file_menu: false
        }
    },

    methods: {

        handlePlay: function(){
            this.in_play = true
            player.play()
        },

        handle_Pause: function(){
            this.in_play = false
            player.pause()
        },

        start_Record: function(){

        },
        
        stop_Record: function(){
            
        }
    }
}