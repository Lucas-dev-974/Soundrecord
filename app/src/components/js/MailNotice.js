import ApiService from "../../services/ApiService";

export default{
    data() {
        return {
            overlay: false,
            title: '',
            type: '',

            password: '',
            password_confirmation: '',
            token: ''
        }
    },

    mounted() {
        this.check_url_notif()
    },  

    methods: {
        check_url_notif: function(){
            if(this.$route.query.mail_service){
                this.overlay = true
                this.type = this.$route.query.type

                if(this.$route.query.type == "reset_password"){
                    this.title = 'Mot de passe oublié'
                    this.token = this.$route.query.mail_service
                }

            }
        },

        delete_notif_url: function(){
            let params = new URLSearchParams(window.location.search)
            params.delete('mail_service')
            params.delete('type')
        },

        close: function(){
            this.delete_notif_url()
            this.overlay = !this.overlay
        },

        reset_password: function(){
            ApiService.patch('/api/user/reset-password', {
                _token_: this.token,
                password: this.password,
                password_confirmation: this.password_confirmation
            }).then(({data}) => {
                console.log(data);
                this.$store.commit('push_alert', {type: 'success', message: data.infos})
                this.overlay = false
            }).catch(error => {
                console.log(error);
            })
        }
    },
}   