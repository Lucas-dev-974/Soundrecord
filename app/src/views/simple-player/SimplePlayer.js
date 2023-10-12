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
                SimpleAudioPlayer.play()
            }
            
            if (event.code === "KeyD") {
                SimpleAudioPlayer.pause()
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
            this.progressBar = document.getElementById('spl-progress');
            SimpleAudioPlayer.setFallback(() => {
                console.log("ok", SimpleAudioPlayer.getCurrentTime());
                if (!SimpleAudioPlayer.paused) {
                    const progressWidth = (SimpleAudioPlayer.getCurrentTime() / SimpleAudioPlayer.getDuration()) * 100 + '%';
                    this.progressBar.style.width = progressWidth;
                }
            })
        })
        
        document.addEventListener('spl-pause', function(){
            this.onPlay = false
            console.log("on pause");
            SimpleAudioPlayer.clearFallback()
        })
        
    },

    methods: {

    }
}