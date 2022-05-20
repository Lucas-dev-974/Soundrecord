import api from "../../../services/ApiService"

export default{
    name: 'artist',
    data() {
        return {
            artist: [],
            query_search: '',
        }
    },

    mounted() {
        this.get_artist()
    },

    methods: {
        get_artist: function(){
            api.get('/api/artists?token=' + this.$store.state.token ?? '').then(({data}) => {
                console.log(data);
            }).catch(error => {
                console.log(error);
            })
        },

        like: function(id){
            api.post('/like', {model: 'creator', modelid: id}).theb(({data}) => {
                console.log(data);
            }).catch(error => {
                console.log(error);
            })
        },
    },
}