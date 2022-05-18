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

            // User infose
            user_img: api.defaults.baseURL + '/api/picture?userid=',
            name:   '',
            pseudo: '',
            email:  '',
            phone:  '',  
            facebook_link:  '',
            instagram_link: '',
            likes: 0,
            liked: false,

            // Profile settings
            picture_file: null,
            banner_color: '#252525',
            banner_img: null,

            // for update
            fields: [],
            settings_fields: []
        }
    },

    watch: {
        picture_file: function(){
            if(!this.overlay)
                this.update_picture()
            else{
                const reader = new FileReader()
                reader.addEventListener('load', () => this.banner_img = reader.result )
                reader.readAsDataURL(this.picture_file);
            }
        },
    },

    mounted(){
        // If userid param is informed in url params so get user profile data's available
        if(this.$route.query && this.$route.query.userid){
            this.my_profile = false
            this.user_profile()
        }else{// Else load user connected profile
            this.my_profile = true
            this.user_img  += this.$store.state.user.id
            this.me()
            this.my_settings()
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

        
        my_settings: function(){
            api.get('/api/profile-settings').then(({data}) => {
                console.log(data);
                let _data = Array2Object(data, 'setting_name', 'setting_value')
                if(_data['banner-img']) _data['banner-img'] = api.defaults.baseURL + '/api/profile/banner?userid=' + this.$store.state.user.id
                
                this.banner_img = _data['banner-img']
                this.$store.commit('push_profile_settings', _data)
                console.log(_data['banner-img']);
                if(_data['banner-color']) this.banner_color = _data['banner-color']
                if(_data['likes'])        this.likes        = _data.likes
                // if(this.$store.state.profile_settings['banner-color']) this.banner_color = this.$store.state.profile_settings['banner-color']   
            }).catch(error => console.log(error))
        },

        user_profile: function(){
            const id = this.$route.query.userid ?? null
            if(id){
                api.get('/api/profile?&userid=' + id + '&token=' + this.$store.state.token ?? null).then(({data}) => { 
                    // If creators field exist
                    if(data.creator){ 
                        for(const creator_field in data.creator){
                            if(this[creator_field] != 'undefined') this[creator_field] = data.creator[creator_field]
                        }
                    }

                    // If settings fields exist
                    if(data.settings){ 
                        // Convert array settings to Object with format setting_name: setting_value
                        let settings = Array2Object(data.settings, 'setting_name', 'setting_value') 
                        for(const setting in settings){['banner-img']
                            if(setting != null){
                                if(this[setting.replace('-', '_')] != 'undefined') this[setting.replace('-', '_')] = settings[setting]
                            }
                        }
                    }
                    console.log(data.like);
                    if(data.like) this.liked = true
                }).catch(error => console.log(error))
            }

        },

        like_profile: function(){
            api.post('/api/like', {model: 'creator', modelid: this.id}).then(({data}) => {
                if(data.destroyed_like){
                    this.liked = false
                    this.likes --
                }else{
                    this.liked = true
                    this.likes ++
                }
            }).catch(error => {
                console.log(error);
            })
        },

        update_profile: function(){
            if(this.on_update == false) this.on_update = true
            else{
                if(this.fields.length > 0){
                    let params = {}
                    this.fields.forEach(field => { params[field] = this[field] });
                    api.patch('/api/user', params).then(() => {
                        this.$store.commit('push_Alert', {
                            type: 'success', message: 'Profile mis à jour'
                        });
                    }).catch(error => {
                        console.log(error);
                    })
                } if(this.settings_fields.length > 0){
                    if(this.settings_fields.includes('banner')){
                        console.log('update banner');
                    }
                }
                this.on_update = false
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

        update_banner: function(event){
            if(typeof(event) == 'object')           this.overlay = false
            else if(event == 'open_banner_setting') this.overlay = true
            else if(event == 'save_banner'){
                if(this.picture_file){
                    const form_data = new FormData()
                    form_data.append('banner-img', this.picture_file)
                    api.post('/api/profile-setting/banner-upload', form_data).then(({data}) => {
                        console.log(data);
                    }).catch(error => {
                        console.log(error);
                    })
                }
                
                if(this.$store.state.profile_settings['banner-color'] && 
                    this.$store.state.profile_settings['banner-color'] != this.banner_color){
                        this.$store.commit('push_profile_settings', {'banner-color': this.banner_color})
                        api.patch('/api/profile-setting', {setting_name: 'banner-color', value: this.banner_color}).then(({data}) => {
                            console.log(data);
                        }).catch(error => {
                            console.log(error);
                        })
                    }
                this.overlay = false
            }
        },

        remove_banner_img: function(){
            this.banner_img = null
            this.$store.commit('push_profile_settings', {'banner-img': null})
            api.delete('/api/profile-setting/banner-img').catch(error => {
                console.log(error);
            })
        },
        
    }
}