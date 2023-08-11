<template>
    <v-app style="overflow-x: auto" :class="appClass">
        <div v-if="$route.name != 'session'">
            <Appbar />
        </div>

        <v-app>
            <div v-for="alert in this.$store.state.alerts" :key="alert.id"
                style="position: absolute; top: 80px; right: 10px; z-index: 99">
                <Alert :alert="alert" />
            </div>
            <v-main :class="$store.state.main_theme">
                <div id="app-content">
                    <router-view>
                    </router-view>
                </div>
            </v-main>
        </v-app>

    </v-app>
</template>

<script>
import Appbar from './components/Appbar.vue'
import ApiService from './services/ApiService'
import Alert from './services/Alert.vue'
import "./layout.css"

export default {
    components: {
        Appbar, Alert,
    },

    data() {
        return {
            appClass: ''
        }
    },

    mounted() {
        this.checkScreen()
        this.is_loggedIn()
        window.onresize = this.checkScreen

        if (this.$route.name == 'homme') this.appClass = 'bg-dark'
    },

    methods: {
        is_loggedIn: function () {
            ApiService.get('/api/auth/').catch(() => {
                if (this.$route.name !== 'authentication') {
                    this.$router.push('authentication')
                }
            })
        },

        checkScreen: function () {
            this.$store.commit('setWidth', window.screen.width)
        },
    }
}
</script>
<!-- TODO: Veille dans layout on check le Token utilisateur pour vérifier  la validité, 
      si non valide alors on retourne l'utilisateur sur la login  -->