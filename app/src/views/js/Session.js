import Sidebar        from '../../components/Sidebar.vue'
import BarManager     from '../../components/Session/BarManager.vue'
import PistContainer  from '../../components/Session/PistManager.vue'

import api        from '../../services/ApiService'
import { player } from '../../services/Player'

export default{
    components: {
        Sidebar, BarManager, PistContainer,
    },

    data(){
        return{
            imported_pists: null,
            track_loaded: false,
            audio_output: []
        }
    },
        
    async mounted(){  
        if (navigator.mediaDevices || navigator.mediaDevices.enumerateDevices) {
            // List microphones.
            let output = await navigator.mediaDevices.enumerateDevices()
            this.audio_output = output
        }
        this.initSession()
    },
    
    methods: {
        initSession: function(){
            if(this.$store.state.current_session){
                player.init_player()
                this.load_imported_pist()
            }else this.$router.push('profile')
        },

        load_imported_pist: function(){
            api.get('/api/session_track/' + this.$store.state.current_session.id)
            .then(({data}) => {
                this.imported_pists = data
                let tracks = this.format_pists()
                player.load_tracks(tracks).then(() => { 
                    this.track_loaded = true 
                    this.handle_time()
                })
            }).catch(error => { console.log(error); })
        },

        format_pists: function(pist = null){ // To format the selected pist as library is asking
            if(pist != null){
                console.log(pist);
            }else{
                let formated_pists = []
                this.imported_pists.forEach(pist => {
                    let pist_ = {
                        //  Updated the package to match with data app needed, include inside the package intialiser
                        //  an api_options fields that allow us to put our app data
                        api_options: {
                            id: pist.id,
                            Importid: pist.ImportId,
                            pistColor: pist.color,
                            muted:  pist.muted,
                        },
                        src: "http://localhost:3000/api/pist/"+ pist.importid +"?token=" + this.$store.state.token,
                        name: pist.Import.name,
                        gain: pist.gain,
                        customClass: 'track-container.' + pist.id,
                        states: {
                            select: true,
                            cursor: false
                        },
                    }
                    formated_pists.push(pist_)
                })
                return formated_pists
            }
        },

        save: function(){
            let session_tracks = []
            this.$store.state.current_session.SessionTracks.forEach(track => {
                // console.log('track: ', track);
                session_tracks.push({
                    id:    track.id,
                    muted: track.muted,
                    color: track.color,
                    gain:  track.gain,
                    name:  track.name
                })
            })

            let session = {
                id:     this.$store.state.current_session.id,
                name:   this.$store.state.current_session.session_name,
                text:   this.$store.state.current_session.text,
                tracks: session_tracks
            }
            console.log(session);
        },

        handle_time: function(){
            let pointer_time = document.createElement('div')
            pointer_time.style.width  = '100px'
            pointer_time.style.height = '100px'
            pointer_time.style.zIndex = 100
            const timeline = document.getElementsByClassName('playlist-time-scale')
            console.log(player.player.cursor);
            console.log(timeline);
            timeline[0].appendChild(pointer_time)
        }
    }
}