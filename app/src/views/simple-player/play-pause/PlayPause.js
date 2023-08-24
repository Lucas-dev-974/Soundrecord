import SimpleAudioPlayer from "../../../services/SimpleAudioPlayer"

export default {
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