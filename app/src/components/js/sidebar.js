import PistPlaylist from '../Session/PistPlaylist.vue'
import SidebarPistManager from '../SidebarPistManager.vue';

import { player } from '../../services/Player';

export default{
    components: {
        PistPlaylist, SidebarPistManager
    },

    data(){
        return{
            open: true,
            mini: true,

            player: null,
            tracks: player.player.tracks
        }
    },
}