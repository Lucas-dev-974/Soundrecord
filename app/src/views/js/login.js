import ApiService from '../../services/ApiService'

export default{
    data(){
        return{
            email: '',
            password: '',
            dialog: false
        }
    },

    methods: {
        login: function(){
            ApiService.post('/api/auth', { email: this.email, password: this.password})
            .then(({data}) => {
                this.$store.commit('set_Token', data.token)
                this.$store.commit('set_User', data.user)
                window.location.href = '/profile'

            }).catch(err => {
                this.$store.commit('push_Alert', {
                    open: true,
                    message: err.response.data.errors ?? err.response.data.error,
                    type: 'warning'
                })
            })
        }
    }
}