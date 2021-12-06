import pist from "../pist"

export default{
    components:{
        pist
    },

    data(){
        return {
            mediaRecorder: null,
            stream: null,
            audio:  null, // Piste d'enregistrement
            audios: [],
            chunk:  [],
            media:   null,
            selectedPist: [],
            slider: 40,
            pists: [],

            contextAudio: null

        }
    },

    mounted(){
        // Récupere la piste d'enregistrement 
        this.audio = this.$refs.audio
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
            navigator.mediaDevices.getUserMedia({audio: true})
            .then(stream => {
                this.stream = stream // Récupère le stream 

            })
        }
    },

    methods: {
        record: function(){
            if(this.mediaRecorder == null || this.mediaRecorder.state == "inactive"){ // Check if is not recording
                this.mediaRecorder = new MediaRecorder(this.stream)
                this.mediaRecorder.start()
                this.mediaRecorder.ondataavailable = (event) => {
                    this.chunk.push(event.data)
                }
            }  
        },

        stop: async function(){
            this.mediaRecorder.onstop = () => {
                const blob = new Blob(this.chunk, {'type': 'audio/ogg; codecs=opus'})
                this.chunk = []
                const audioUrl = window.URL.createObjectURL(blob)

                // build HTML audio component
                let audio = document.createElement('audio')
                audio.src = audioUrl
                let id = (this.pists.length > 0) ? this.pists.slice(-1)[0].id + 1 : 1 


                this.pists.push(this.formattedPist(id, audio, false)) // Push audio in audios array
            }
            this.mediaRecorder.stop()
        },

        play: function(){
            this.selectedPist.forEach(pist => {
                pist.audio.play()
            })

        },

        save: function(){
            this.pist.currentTime = 1
            console.log(this.audio.duration);
        },

        setSelectedPist: function(pist){
            console.log(pist);
            let pists  = this.selectedPist.map((pist) => {
                console.log(pist);
            })
            console.log(pists);
        },

        returnCheckBox: function(pist){
            return pist.selected
        },

        formattedPist: function(id, audio, selected){
            return{
                id: id,
                audio: audio,
                selected: selected
            }
        },

        addTemplate: function(file){ // Add audio file to pists
            
        },

    }
}