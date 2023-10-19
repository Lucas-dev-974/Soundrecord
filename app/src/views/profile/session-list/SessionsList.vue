<template>
    <section class="profile-content-section">
        <header class="profile-content-header">
            <SearchBar onKeyPressEnter="sz" placeholder="Recherchez une session" />
            <button @click="createSession">Créer</button>
        </header>

        <div class="profile-content-content">
            <!-- List of  sessions -->
            <div v-for="session in sessions" :key="session.id">
                {{ session }}
            </div>
        </div>
    </section>
</template>

<script>
import ApiSession from "../../../apis/api.session"
import SearchBar from "../../../components/search-bar/SearchBar.vue"

export default {
    components: { SearchBar },

    data() {
        return {
            sessions: []
        }
    },

    mounted() {
        this.getSessions()
    },

    methods: {
        getSessions: async function () {
            this.sessions = await ApiSession.all()
            console.log("SESSIONS", this.sessions);
        },

        createSession: async function () {
            const response = await ApiSession.create({ name: "Session 1" })
            this.$store.commit('setCurrentSession', response)
            console.log("current session:", this.$store.state.currentSession);
            this.$router.push('/studio')

            console.log("add session");
        }
    }
}
</script>