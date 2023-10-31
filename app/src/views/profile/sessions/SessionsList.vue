<template>
    <section class="profile-content-section">
        <header class="profile-content-header">
            <Searchbar onKeyPressEnter="sz" placeholder="Recherchez une session" :onInput="search" />
            <button @click="createSession">Créer</button>
        </header>

        <div class="profile-content-content">
            <!-- List of  sessions -->
            <div v-for="session of sessions" :key="session.id">
                <SessionItem :session="session" :removeSession="removeSession" />
            </div>
        </div>
    </section>
</template>

<script>
import ApiSession from "../../../apis/api.session"
import Searchbar from "../../discover/searchbar/Searchbar.vue"
import SessionItem from "./session-item/SessionItem.vue"
import "./SessionList.css"

export default {
    components: { Searchbar, SessionItem },

    props: {
        sessionsProps: { required: true },
    },

    data() { return { sessions: [] } },

    mounted() {
        this.getSessions()
    },

    methods: {
        getSessions: async function () {
            const sessions = await ApiSession.all()
            if (this.$store.state.currentSession.id == null)
                this.sessions = sessions.datas
            else {
                // replace last session at the top of list
                const currentSessionIndex = sessions.datas.findIndex(item => item.id == this.$store.state.currentSession.id)
                const currentSession = sessions.datas[currentSessionIndex]
                if (currentSession != undefined) {
                    sessions.datas.splice(currentSessionIndex, 1)
                    sessions.datas.unshift(currentSession)
                }
                this.sessions = sessions.datas
            }
        },

        createSession: async function () {
            const response = await ApiSession.create({ name: "Session 1" })
            this.$store.commit('setCurrentSession', response)
            this.$router.push('/studio')
        },

        search: async function (inputKeys) {
            if (inputKeys == "") return this.getSessions()
            const sessions = await ApiSession.search(inputKeys)
            console.log("Searched sessions:", sessions);
            this.sessions = sessions.datas
        },

        removeSession: function (session) {
            this.sessions = this.sessions.filter(item => item.id != session.id)
        }
    }
}
</script>