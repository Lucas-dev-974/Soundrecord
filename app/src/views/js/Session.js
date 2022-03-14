import Sidebar from '../../components/Sidebar.vue'
import BarManager from '../../components/BarManager.vue'
import PistContainer  from '../../components/PistManager.vue'

import WaveformPlaylist from 'waveform-playlist'

import api from '../../services/ApiService'

import { EventBus } from '../../services/EventBus'

export default{
    components: {
        Sidebar, BarManager, PistContainer,
    },

    data(){
        return{
            player: null
        }
    },
    
    mounted(){  
        this.init_Player()
        this.loadImportedPist()
        this.format_pists()

        let _this = this
        EventBus.$on('global_volume', function(val){
            _this.player.getEventEmitter().emit('mastervolumechange', val)
        })

        this.player.getEventEmitter().on('timeupdate', function(time){
            time = time.toFixed(2)  
            
            let minutes = Math.floor(time / 60)
            let seconds = time - minutes * 60

            seconds = seconds.toFixed(2)
            _this.$store.commit('set_PlayerCurrentTime', minutes + ':' + seconds)
        })

        window.addEventListener('resize', this.checkScreen)
        this.checkScreen()
    },
    
    methods: {
        init_Player: async function(){
            this.player = WaveformPlaylist({
                samplesPerPixel: 3000,
                mono: true,
                waveHeight: 90,
                container: document.getElementById("pists-container"),
                state: "select",
                seekStyle: "fill",
                colors: {
                    waveOutlineColor: "rgb(26, 29, 33)",
                    timeColor: "#FFF",
                    fadeColor: "red",
                },
                zoomLevels: [500, 1000, 3000, 5000],
                timescale: true,
                barWidth: 2
            })
        },
        
        load_PlayerPist: function(){
            this.player.load(this.$store.state.pists)
        },

        checkScreen: function(){
            if(window.screen.width > 600){
                  this.is_mobile = false
                  this.$store.commit('set_IsMobile', false)
            }else this.$store.commit('set_IsMobile', true)
        },

        loadImportedPist: function(){
            api.get('/api/importedIn/' + this.$store.state.current_session.id)
                .then(({data}) => {
                    this.$store.commit('set_Pists', data)
                }).catch(error => {
                    this.$store.commit('push_Alert', {
                        open: true,
                        message: error.response.data.errors ?? error.response.data.error
                    })
                })
        },

        play_Pists: function(){
            this.player.getEventEmitter().emit('play')
        },

        pause_Pists: function(){
            this.player.getEventEmitter().emit('pause')
        },

        format_pists: function(){ // To format the selected pist as library is asking
            let formated_pists = []

            this.$store.state.pists.forEach(pist => {
                let pist_ = {
                    id: pist.id,
                    src: "http://localhost:3000/api/pists/1?token=" + this.$store.state.token,
                    name: pist.Import.name,
                    gain: pist.volume,
                    muted: !pist.selected,
                    customClass: 'WaveLine',
                    pistColor: pist.color,
                }
                formated_pists.push(pist_)
            })

            this.$store.commit('set_Pists', formated_pists)
            this.load_PlayerPist()
        },
    }
}