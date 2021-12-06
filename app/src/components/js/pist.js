export default{
    name: 'pist',
    props:{
        currentTime:{required: true},
        audio: {required: true}
    },

    data(){
        return{

        }
    },

    watch: {
        currentTime(currentTime){
           this.audio.audio.currentTime = currentTime
        }
    },

    mounted(){
        let audioContainer = document.getElementById('audioSlider' + this.audio.id)
        this.audio.audio.addEventListener('click', () => {
            console.log('input clicked');
        })
        console.log(this.audio.id);
        audioContainer.appendChild(this.audio.audio)
        this.audio.audio.setAttribute('controls', '')
    },

    methods: {

    }
}