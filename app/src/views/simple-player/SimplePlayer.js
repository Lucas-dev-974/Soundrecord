import "./SimplePlayer.css"
import SimpleAudioPlayer from "../../services/SimpleAudioPlayer"
import VolumeSlider from "./volume-slider/VolumeSlider.vue"
import PlayPause from "./play-pause/PlayPause.vue"
import Progress from "./progress-bar/Progress.vue"

export default {
    components: {
        VolumeSlider, PlayPause, Progress
    },
    
    data(){
        return {
            onPlay: false,
            intervals: [],
            progressBar: null
        }
    },

    mounted(){
        document.addEventListener('keypress', event => {
            if (event.code === 'Space') {
                if(SimpleAudioPlayer.paused) SimpleAudioPlayer.play()
                else SimpleAudioPlayer.pause() 
            }
            
        })

        document.addEventListener('DOMContentLoaded', () => {
            if(this.progressBar == null){
                try{
                    this.progressBar = document.getElementById('spl-progress') 
                }catch(error){
                    console.log("la progress na pas été trouver");
                }
            }
        })

        document.addEventListener('spl-play', function(){
            this.onPlay = true
            if(this.progressBar == null)
                this.progressBar = document.getElementsByClassName('spl-progress')[0];
            SimpleAudioPlayer.setFallback(() => {
                if (!SimpleAudioPlayer.paused) {JSON.stringify
                    const progressPercent = (SimpleAudioPlayer.getCurrentTime() / SimpleAudioPlayer.getDuration()) * 100;
                    this.progressBar.value = progressPercent;
                }
            })
        })
        
        document.addEventListener('spl-pause', function(){
            this.onPlay = false
            SimpleAudioPlayer.clearFallback()
        })
    },

    methods: {
        onRangeInput: function(event){
            SimpleAudioPlayer.setCurrentTime(this.trouverValeurPourcentage(event.target.value, SimpleAudioPlayer.getDuration()))
        }
    }
}