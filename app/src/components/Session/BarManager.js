import VolumeController from './VolumeController.vue'
import Menu     from './menu.vue'

import { player } from '../../services/Player'

export default{
    name: 'session-top-bar-manager',
    components: { VolumeController, Menu },

    data(){
        return{
            player:    player,
            in_record: false,
            in_play:   false,
        }
    },
    

    mounted() {
    },

    methods: {
        play:   function(){ player.play();   this.in_play = true },
        pause:  function(){ player.pause();  this.in_play = false },
        record: function(){ player.record(); this.in_record = true },
        stopRecord: function(){player.stopRecord(); this.in_record = false},
        
        track_move: function(){
            if(player.player.state == 'shift') player.set_state('select')
            else player.set_state('shift')
        },

        cutSelection: function(){
            console.log(player);
            player.player.getEventEmitter().emit('trim')
        },

        
        download: function(){ player.download() }
    }
}