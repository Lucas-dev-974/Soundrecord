import api from "../../services/ApiService";
import store from '../../services/store'
export default {
    props: {
        pist: { required: true }
    },

    data(){
        return {
            selected: this.pist.selected,
            name: this.pist.Import.name,
            nameInput_ref: 'pistnameinput' + this.id,
            volume: this.pist.volume,
            selectBtn: null
        }
    },

    watch: {
        volume: function(val){
            val = '0.' + parseInt(val)
            let pist = document.getElementById('pist-' + this.pist.id)  
            if(pist){
                pist.volume = val
                store.commit('update_Pist', {
                    pistid: this.pist.id,
                    field: 'volume',
                    value: val
                })
            }
        }
    },

    mounted(){  
        // console.log('in sidebar pist manager pist :', this.pist);
        this.volume = this.volume.toString().split('.')[1]

        this.selectBtn = document.getElementById('select-btn-' + this.pist.id)
        if(this.selected) this.selectBtn.style.backgroundColor = 'green'
        else this.selectBtn.style.backgroundColor = 'gray'
    },

    methods: {
        deleteImportedPist: function(){
            let url = `/api/importedIn/${this.$store.state.current_session.id}/${this.pist.importid}`
            api.delete(url)
                .then( async ({data}) => {
                    data
                    console.log('remove datas');
                    this.$store.commit('remove_PistPlaylist', this.pist.id)
                    this.$store.commit('remove_SelectedPist  ', this.pist.id)
                    await this.$emmit('load_PlayerPist')
                }).catch(error => console.log(error))
        },

        DeselectSelect: function(){
            this.selected = !this.selected
            this.$store.commit('update_SelectedPist', {
                pistid: this.pist.id,
                field: 'muted',
                value: this.selected
            })

            document.getElementById('select-btn-' + this.pist.id)
            if(this.selected) this.selectBtn.style.backgroundColor = 'green'
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