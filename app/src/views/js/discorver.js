import artists from '../../components/discover/artist.vue'
import songs from '../../components/discover/song.vue'

export default{
    name: 'discover',
    components: { artists, songs },

    data() {
        return {
            creators: [],
            packs:    [],

            page: 'artists',
        }
    },

    mounted() {
    },

    methods: {
    },
}