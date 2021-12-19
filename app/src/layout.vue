<template>
    <v-app > 
        <Appbar />
        <v-app>
            <Alert  style="z-index: 99; top: 70px; position: absolute; width: 100%;" />
            <v-main>
                <router-view>
                </router-view>
            </v-main>
        </v-app>

    </v-app>
</template>

<script>
import Appbar from './components/Appbar.vue'
import ApiService from './services/ApiService'
import Alert      from './services/Alert.vue'

export default{
    components: {
        Appbar, Alert
    },

    mounted(){
        this.is_loggedIn()
    },

    methods: {
        is_loggedIn: function(){
            ApiService.get('/api/auth/')
            .then(({data}) => {
                data
            }).catch(err => {
                err
                if(window.location.pathname !== '/authentication'){
                     window.location.href = '/authentication'
                }
            })
        }
    }
}
</script>
