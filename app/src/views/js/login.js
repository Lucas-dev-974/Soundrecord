import ApiService from '../../services/ApiService'

export default{
    data(){
        return{
            email: '',
            password: '',
        }
    },

    methods: {
        login: function(){
            ApiService.post('/api/auth/', {
                email: this.email, password: this.password
            }).then(({data}) => {
                this.$store.commit('set_token', data.token)
                window.location.href = '/'
            }).catch(err => {
                this.$store.commit('push_alert', {
                    open: true,
                    message: err.response.data.errors ?? err.response.data.error
                })
            })
        }
    }
}