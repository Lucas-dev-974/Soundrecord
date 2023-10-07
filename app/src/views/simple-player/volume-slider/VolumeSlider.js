import SimpleAudioPlayer from "../../../services/SimpleAudioPlayer";



export default {
    data(){
        return {    
            sliderElement: null
        }
    },
    
    mounted(){
        this.setEventsListener()
        this.sliderElement.addEventListener('input', () => {
            const volume = this.sliderElement.value;
            SimpleAudioPlayer.setVolume(volume);
        });
          
        
    },
    methods: {
        setEventsListener: function(){
            try{
                this.sliderElement = document.getElementById('volumeRange')
            }catch(error) {
                console.log(error);
                return;
            }
        }
    }
}