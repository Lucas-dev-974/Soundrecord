import ApiService from "../../services/ApiService"

export default{
    data(){
        return{
            email: '',
            name: '',
            password: '',
            phone: '',
            pseudo: '',

            email_rule: [email => !email || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) || 'l\'email dois être valide'],

            formHasErrors: false,
        }
    },

    computed: {
        form: function(){
            return {
                pseudo: this.pseudo,
                email:  this.email,
                name:   this.name,
                password: this.password,
            }
        }
    },

    methods: {

        checkForm: function(){
            this.formHasErrors = false

            Object.keys(this.form).forEach(f => {
                if (!this.form[f]) this.formHasErrors = true
                this.$refs[f].validate(true)
            })

            console.log(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email));
            if(!this.formHasErrors) {
                if(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email))
                    this.register()
                else
                    this.$store.commit('push_alert', {type: 'warning', open: true, message: 'Email incorrecte'})
            }
        },

        register: function(){
            ApiService.patch('/api/auth', {
                email: this.email,
                name: this.name,
                password: this.password,
                phone: this.phone,
                pseudo: this.pseudo
            }).then(({data}) => {
                this.$store.commit('setUser',  data.user)
                this.$store.commit('setToken', data.token)
                window.location.href = '/profile    '
            }).catch(error => {
                this.$store.commit('push_alert', {
                    type: 'warning',
                    message: error.response.data.errors ?? error.response.data.error
                })
            })
        }
    }
}