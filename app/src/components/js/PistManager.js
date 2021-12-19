import Pist from '../pist.vue'

export default{
    components: {
        Pist
    },
    
    data(){
        return {
            Recorder: {},
            pists: this.$store.state.currentSession.pists ?? []
        }
    },

    mounted(){
        this.state.Recorder.Context   = new AudioContext()
        this.state.Recorder.recorder  = false
        this.state.Recorder.recording = false
    },

    methods:{
        startRecord: function(){
            this.state.Recorder.recording = this.state.Recorder.Context.createMediaStreamDestination();
            this.state.Recorder.recorder  = new MediaRecorder(this.state.Recorder.recording)
            this.state.Recorder.recorder.start()
        }
    }
}