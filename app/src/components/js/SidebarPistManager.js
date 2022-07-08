import VolumeController from '../Session/VolumeController.vue'

import api from "../../services/ApiService";
import { player } from '../../services/Player';
// import { player } from '../../services/Player'

export default {
    name: 'sidebar-pist-item',
    components: { VolumeController },

    // pist in player ( manage the player track) 
    props: { pist: { required: true } },

    data(){
        return {
            name: this.pist.name,
            nameInput_ref: 'pistnameinput' + this.id,
            volume: this.pist.gain,
            player: player
        }
    },

    mounted(){

        // Muted button if the track is muted so button is gray else is green
        this.selectBtn = document.getElementById('select-btn-' + this.pist.api_options.id)
        if(this.pist.muted) this.selectBtn.style.backgroundColor = 'green'
        else this.selectBtn.style.backgroundColor = 'gray'
    },

    methods: {
        deleteImportedPist: async function(){
            let url = `/api/session_track/${this.pist.api_options.id}`
            
            const response = await api.delete(url).catch(error => console.log(error))
            if(response.status == 200){
                // this.$store.commit('remove_pist', this.pist.api_options.id)
                this.pist.ee.emit('removeTrack', this.pist)
            }

        },

        DeselectSelect: function(){
            console.log(this.track);
            document.getElementById('select-btn-' + this.pist.id)
            if(this.muted == false) this.selectBtn.style.backgroundColor = 'green'
            else this.selectBtn.style.backgroundColor = 'gray'
        },

        ChangePistColor: function(color){
            let pist = document.getElementById('pist-' + this.pist.api_options.id)
            pist.style.backgroundColor = color
            if(typeof(color) !== 'object'){
                this.$store.commit('update_Pist', {
                    pistid: this.pist.api_options.id,
                    field: 'color',
                    value: color
                })
            }
        },

        RenamePist: function(){
        },

    }
}