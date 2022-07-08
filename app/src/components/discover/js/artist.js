import api from "../../../services/ApiService"
import Searchbar from '../../Searchbar.vue'

export default{
    name: 'artist',
    components: { Searchbar },

    data() {
        return {
            artists: [],
            art_selected: 1,
            query_search: '',

            api: api
        }
    },

    async mounted() {
        await this.get_artists()
    },

    methods: {
        get_artists: async function(page = 0){
            api.get('/api/creators?page=' + page + '&token=' + this.$store.state.token ?? '').then(({data}) => {
                console.log(data);
            }).catch(error => {console.log(error)})
            // console.log(response);
            // if(response.status == 200) this.artists = response.data.rows
            // return this.artists
        },

        like: function(id){
            api.post('/like', {model: 'creator', modelid: id}).theb(({data}) => {
                console.log(data);
                this.artist.filters(artist => {
                    if(artist.id == id) artist.liked = data.liked
                })
            }).catch(error => {
                console.log(error); 
            })
        },
    },
}