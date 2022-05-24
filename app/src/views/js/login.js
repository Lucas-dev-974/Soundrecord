import ApiService from '../../services/ApiService'
import MailNotif  from '../../components/MailNotif.vue'

export default{
    components: { MailNotif },

    data(){
        return{
            email: '',
            password: '',
            dialog: false,

            email_rule: [email => !email || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) || 'l\'email dois être valide'],
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
                this.$store.commit('push_alert', {
                    open: true,
                    message: err.response.data.errors ?? err.response.data.error,
                    type: 'warning'
                })
            })
        },

        forgot_password: async function(){
            if(this.email.length == 0 || !(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email))) 
                return this.$store.commit('push_alert', {type: 'warning', message: 'Veuillez saisir un email valide'})

            let email_send = await ApiService.post('/api/mail/password-reset', {email: this.email}).catch(error => console.log(error))
            
            if(email_send.status == 200) {
                this.$store.commit('push_alert', {type: 'success', message: 'Un mail vous à été envoyé.'})
            }
        },
        
    }
}