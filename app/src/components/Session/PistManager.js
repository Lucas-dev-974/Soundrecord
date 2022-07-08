import { player } from "../../services/Player"

export default{
    data(){
        return {
            text: this.$store.state.current_session.text,
            show_menu: false,
            x: 0,
            y: 0,

            ontrack: null,
            track_on_move: true
        }
    },

    mounted() {
        this.track_on_move = player.track_on_move   
    },

    methods:{
        update_text: function(){
            
        },
        
        action_Play: function(){
            this.playlist.ee.emit('play')
        },

        action_Pause: function(){
            this.playlist.ee.emit('pause')
        },

        show(e){
            e.preventDefault()
            this.show_menu = false
            this.x = e.clientX
            this.y = e.clientY
            this.$nextTick(() => {
              this.show_menu = true
            })
        },

        on_track: function(e){
            document.querySelectorAll('.channel.channel-0').forEach(element => {
                if(element.classList.contains('selected')) element.classList.remove('selected')
                
            })

            // First get track container to next get the track id inside track container classList
            let track_container = e.explicitOriginalTarget.parentElement.parentElement
            let track = e.explicitOriginalTarget.parentElement.childNodes[1]
            track.classList.add('selected')

            // Get track from player with the track id
            const ptrack = player.get_track(track_container.classList[2])
            this.ontrack = ptrack[0] ? ptrack[0] : null
        },

        move_track: function(){
            if(!player.track_on_move) player.set_state('shift')
            else player.set_state('select')
            this.track_on_move = player.track_on_move
        },

        track_select: function(){
            const render_track = document.getElementsByClassName('track-container')
            if(!player.on_selection) player.set_state('select')
            else player.set_state('cursor')
            
            for(const track in render_track){
                console.log(track);
            }
        },

        get_pixeltime: function(){
            console.log(player.player);
            
        }
    }
}