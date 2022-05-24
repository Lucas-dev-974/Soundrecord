import VolumeController from './VolumeController.vue'
import Menu     from './menu.vue'

import { player } from '../../services/Player'

export default{
    components: {
        VolumeController, Menu
    },

    data(){
        return{
            player: player,
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
        
        mute_unmute: function(){
            // player.mute_unmute()
        },

        start_Record: function(){

        },
        
        stop_Record: function(){
            
        },

        track_move: function(){
            if(player.player.state == 'shift'){
                player.set_state('select')
            }else player.set_state('shift')
        },

        
        download: function(){
            player.download()
        }
    }
}