import Pist from './pist.vue'

export default{

    components: {
        Pist
    },
    
    data(){
        return {
            text: this.$store.state.current_session.Text.text,
            Timeline: 0,

            playlist: null,
            play: null,
            pause: null, 
        }
    },

    mounted(){
    },

    methods:{
        update_text: function(){
            
        },
        
        action_Play: function(){
            this.playlist.ee.emit('play')
        },

        action_Pause: function(){
            this.playlist.ee.emit('pause')
        }
    }
}