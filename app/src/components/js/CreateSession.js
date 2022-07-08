import api from "../../services/ApiService"

export default{
    data() {
        return {
            dialog: false,
            name: '',
        }   
    },

    created(){

    },
    
    methods: {
        createSession: function(){
            api.post('/api/session/', {name: this.name})
            .then(({data}) => {
                this.dialog = false
                this.$store.commit('appendSession', data)
            }).catch(error => {
                console.log(error);
            })
        }
    }
}