import api from "../../services/ApiService"

export default{
    data() {
        return {
            creators: [],
            packs:    [],
        }
    },

    mounted() {
        this.get_creators()
    },

    methods: {
        get_creators: function(){
            api.get('/api/creators').then(({data}) => {
                console.log(data);
            }).catch(error => {
                console.log(error);
            })
        },
        
        get_packs: function(){

        },


    },
}