import ApiService from "../../services/ApiService"

export default{
    data(){
        return{
            email: '',
            name: '',
            password: '',
        }
    },

    methods: {
        register: function(){
                ApiService.patch('/api/auth/', {
                    email: this.email,
                    name: this.name,
                    password: this.password
                }).then(({data}) => {
                    this.$store.commit('set_User', data.user)
                    this.$store.commit('set_Token', data.token)
                    this.$router.push('/dashboard')
                }).catch(error => {
                    this.$store.commit({
                        open: true,
                        message: error.response.data.errors ?? error.response.data.error
                    })
                })
        }
    }
}