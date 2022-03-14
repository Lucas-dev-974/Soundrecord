import VolumeController from '../VolumeController.vue'
import PistPlaylist     from '../PistPlaylist.vue'
import { EventBus } from '../../services/EventBus'

const utils = require('../../utils.js')

export default{
    components: {
        VolumeController, PistPlaylist
    },

    data(){
        return{
            play: false,
            in_record: false,
            in_play: false,
            g_volume: 100,

            responsive: {
                g_volumeWidth: '200px',
            },

            file_menu: false
        }
    },

    watch:{
        g_volume: function(val){
            EventBus.$emit('global_volume', val)
        }
    },

    mounted(){
        this.handle_Resize()
        if(this.$store.state.main_audio == null){
            this.$store.commit('set_MainAudio', window.AudioContext || window.webkitAudioContext)
        }
        window.addEventListener('resize', this.handle_Resize)
    },

    methods: {
        handle_Resize: function(){
            let btnControls = document.getElementsByClassName('button-controls')
            if(this.$store.state.is_mobile){
                this.responsive.g_volumeWidth = '150px !important'
                utils.setClass(btnControls, 'v-size--default', 'v-size--large')

            }else{
                this.responsive.g_volumeWidth = '200px !important'
                utils.setClass(btnControls, 'v-size--large', 'v-size--default')
            }
        },


        handlePlay: function(){
            this.in_play = true
            this.$emit('play_SelectedPist')
        },

        handle_Pause: function(){
            this.in_play = false
            this.$emit('pause_SelectedPist')
        },

        start_Record: function(){

        },
        
        stop_Record: function(){
            
        }

        
    }
}