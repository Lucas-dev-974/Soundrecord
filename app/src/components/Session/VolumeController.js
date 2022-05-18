import { player } from "../../services/Player";

export default{
    props:{
        track: { required: false }
    },

    data(){
        return{
            value: player.player && !this.track ? player.player.masterGain : 20,
        }
    },

    watch: {
        value: function(val){
            if(player.player && !this.track){
                player.set_volume(val)
            }else if(player.player && this.track){
                player.set_track_volume(val, this.track)
            }
        },
    },

    mounted() {
        if(this.track) this.value = 50
    },
}