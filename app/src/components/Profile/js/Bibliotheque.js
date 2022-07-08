import api from '../../../services/ApiService.js'

import Searchbar from '../../Searchbar.vue'

export default {
    props: {
        mine: {required: true}
    },

    components: {
        Searchbar
    },  

    data() {
        return {
            pists: [],
        }
    },

    mounted(){
        this.get()
    },

    methods: {
        get: async function(page = 0){
            let response = await api.get('/api/pists?page=' + page)
            if(response.status == 200){
                let totalPages = response.data.totalPages
                this.pists     = [...response.data.datas]
                return totalPages
            }
        },

        update: function(){

        },

        deletePist: function(id){
            api.delete('/api/pist/' + id).then(() => {
                this.pists = this.pists.filter(pist => pist.id != id)
            }).catch(error => {
                console.log(error);
            })
        }
    }
}