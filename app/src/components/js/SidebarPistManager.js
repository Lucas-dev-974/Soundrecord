import VolumeController from '../Session/VolumeController.vue'

import api from "../../services/ApiService";
import { player } from '../../services/Player'

export default {
    components: {
        VolumeController
    },

    props: {
        pist: { required: true } // pist in player ( manage the player track)
    },

    data(){
        return {
            name: this.pist.name,
            nameInput_ref: 'pistnameinput' + this.id,
            volume: this.pist.gain,
            selectBtn: null,

            index: player.player.tracks.indexOf(this.pist), // index of the pist in player
            _pist: null      // pist out of player
        }
    },

    watch: {
        volume: function(val){
            val
        }
    },

    mounted(){  
        // Set pist
        this._pist = this.$store.state.pists[this.index]
        
        // Muted button if the track is muted so button is gray else is green
        this.selectBtn = document.getElementById('select-btn-' + this.pist.id)
        if(this.pist.muted) this.selectBtn.style.backgroundColor = 'green'
        else this.selectBtn.style.backgroundColor = 'gray'
    },

    methods: {
        deleteImportedPist: function(){
            let url = `/api/session_track/${this._pist.id}`
            
            api.delete(url)
                .then( async () => {
                    this.$store.commit('remove_Pist', this._pist.id)
                    this.pist.ee.emit('removeTrack', this.pist)
                    // console.log('pist removed')
                }).catch(error => console.log(error))
        },

        DeselectSelect: function(){
            this.pist.muted = !this.pist.muted
            this.$store.commit('update_SelectedPist', {
                pistid: this.pist.id,
                field: 'muted',
                value: this.muted
            })

            document.getElementById('select-btn-' + this.pist.id)
            if(this.muted == false) this.selectBtn.style.backgroundColor = 'green'
            else this.selectBtn.style.backgroundColor = 'gray'
        },

        ChangePistColor: function(color){
            let pist = document.getElementById('pist-' + this.pist.id)
            pist.style.backgroundColor = color
            if(typeof(color) !== 'object'){
                console.log(color);
                this.$store.commit('update_Pist', {
                    pistid: this.pist.id,
                    field: 'color',
                    value: color
                })
            }
        },

        RenamePist: function(){
        },

    }
}