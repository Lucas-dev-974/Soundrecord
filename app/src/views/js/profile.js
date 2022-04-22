import api from '../../services/ApiService.js'
import { Array2Object } from '../../utils.js'

import SessionLists from '../../components/Profile/SessionLists.vue'
import Bibliotheque from '../../components/Profile/Bibliotheque.vue'
export default{

    components: {
        SessionLists, Bibliotheque
    },

    data(){
        return {
            on_update: false,
            show_details:   true,
            my_profile: true,
            page: 'session',
            overlay: false,

            // User infos
            user_img: 'http://127.0.0.1:3000/api/picture/?token=' + this.$store.state.token ,
            name: '',
            pseudo:   '',
            email:    '',
            phone: '',  
            facebook_link: '',
            instagram_link: '',

            // Profile settings
            picture_file: null,

            // for update
            fields: [],
            settings_fields: []
        }
    },

    watch: {
        picture_file: function(){
            console.log(this.picture_file);
            this.update_picture()
        }
    },

    mounted(){
        if(this.$route.query && this.$route.query.userid){
            this.my_profile = false
            this.UserProfile()
        }else{
            this.me()
            this.mySettings()
        }
    },

    methods: {
        details: function(){ this.show_details = !this.show_details },
        me: function(){
            api.get('/api/user')
                .then(({data}) => {
                    this.name   = data.name
                    this.pseudo = data.pseudo ?? ''
                    this.email  = data.email
        
                    this.facebook_link  = data.facebook_link  ?? ''
                    this.instagram_link = data.instagram_link ?? ''

                    this.$store.commit('set_User', data)
                }).catch(() => {
                    this.$store.commit('push_Alert', {type: 'danger', message: 'Un problème est survenue !'})
                })
        },

        mySettings: function(){
            api.get('/api/profile-settings').then(({data}) => {
                this.$store.commit('set_ProfileSettings', Array2Object(data, 'setting_name', 'setting_value'))
            }).catch(error => console.log(error))
        },

        UserProfile: function(){
            const id = this.$route.query.userid
            api.get('/api/profile?userid=' + id).then(({data}) => { 
                this.email = data.user.email ?? ''
                this.name  = data.user.name  ?? ''
                this.pseudo = data.user.pseudo ?? ''
                this.phone  = data.user.phone ?? ''
                
                this.facebook_link = data.user.facebook_link ?? ''
                this.instagram_link = data.user.instagram_link ?? ''

                if(Object.entries(data.settings).length > 0){
                    this.$store.commit('set_ProfileSettings', Array2Object(data.settings, 'setting_name', 'setting_value'))
                }
            }).catch(error => console.log(error))
        },

        update_profile: function(){
            if(this.on_update == false) this.on_update = true
            else{
                if(this.fields.length > 0){
                    let params = {}
                    this.fields.forEach(field => { params[field] = this[field] });
                    api.patch('/api/user', params)
                    .then(() => {
                        this.$store.commit('push_Alert', {
                            type: 'success', message: 'Profile mis à jour'
                        });
                        this.on_update = false
                    }).catch(error => {
                        console.log(error);
                    })
                } if(this.settings_fields.length > 0){
                    if(this.settings_fields.includes('banner')){
                        console.log('update banner');
                    }
                }
            }
        },

        update_fields: function(field, field_setting = false){
            if(!this.fields.includes(field) && !field_setting) this.fields.push(field)
            else if(field_setting && !this.settings_fields.includes(field)) this.settings_fields.push(field)
        },

        update_picture: function(){
            // Create form to send file
            let formData = new FormData()
            formData.append('profile_picture', this.picture_file) // Add file

            // Send request with the form data
            api.post('/api/picture', formData).then(() => {
            }).catch(error => {
                console.log(error);
            })
        },

        update_color: function(){
            this.overlay = !this.over
        }
    }
}