import Menu from '../Session/menu.vue'
import SidebarPistManager from '../SidebarPistManager.vue';

import { player } from '../../services/Player';

export default{
    name: 'sidebar',
    components: {
        Menu, SidebarPistManager
    },

    data(){
        return{
            open: true,
            mini: true,

            player: player.player,
            tracks: player.player.tracks
        }
    },
}