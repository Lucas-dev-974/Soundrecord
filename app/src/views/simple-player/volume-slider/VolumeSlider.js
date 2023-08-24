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
            console.log(volume);
            SimpleAudioPlayer.setVolume(volume);
        });
          
        
    },
    methods: {
        onChange: function(e){
            console.log("changed", e);
        },

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