// import { player } from "../../services/Player";

export default{
    props:{
        type:  { required: true  },
        track: { required: false }
    },

    data(){
        return{
            value: 0
        }
    },

    watch: {
        value: function(){
            // if(this.type == 'g_volume'){ // Check if component manage global volume or pist volume
            //     this.$store.commit('set_PlayerGlobalVolume', val) // Change the volume with the slide value
            //     player.set_volume(val)
            // }else if(this.type == 'track_volume'){
            //     console.log('change track volume');
            //     player.set_track_volume(val, this.track)
            // }
        }
    },

    mounted(){
        if(this.type == 'g_volume'){
            this.value = this.$store.state.player_g_volume // Setup the slide value with the volume value
        }else if(this.type == 'track'){
            console.log('is track volume');
        }
    }
}