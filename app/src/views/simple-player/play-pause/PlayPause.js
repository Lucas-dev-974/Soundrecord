import SimpleAudioPlayer from "../../../services/SimpleAudioPlayer"
import PlayIcon from "../../../icons/PlayIcon.vue"
import "./PlayPause.css"

export default {
    components: {
        PlayIcon
    },

    data(){
        return {
            onPlay: false
        }
    },  

    mounted(){
        document.addEventListener('spl-play', () => this.onPlay = true)
        document.addEventListener('spl-pause', () => this.onPlay = false)
    },

    methods: {
        play: function(){
            SimpleAudioPlayer.play()
        },

        pause: function(){
            SimpleAudioPlayer.pause()
        }
    }
}