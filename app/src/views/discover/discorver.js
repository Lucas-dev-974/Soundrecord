import artists from '../../components/discover/artist.vue'
import songs from '../../components/discover/song.vue'
import Searchbar from './molecul/Searchbar.vue'

export default{
    name: 'discover',
    components: { artists, songs, Searchbar },

    data() {
        return {
            songs: [],
            page: 'artists',
            searchKeyword: ''
        }
    },

    mounted() {
    },

    methods: {

    },
}