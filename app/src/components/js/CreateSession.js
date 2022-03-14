import api from "../../services/ApiService"

export default{
    data() {
        return {
            dialog: false,
            name: '',
        }   
    },
    
    methods: {
        createSession: function(){
            api.post('/api/sessions/', {name: this.name})
            .then(({data}) => {
                this.dialog = false
                this.$store.commit('append_Session', data)
            }).catch(error => {
                console.log(error);
            })
        }
    }
}