<template>
    <div v-if="user">
        <section id="profile-head">
            <ProfileHead :user="user" :isLogedInProfile="isLogedInProfile" />
        </section>

        <section id="profile-tab">
            <div class="line gap-5">
                <p v-if="isLogedInProfile()" class="profile-view-selector" @click="() => changeView('sessions')">
                    Sessions
                </p>
                <p class="profile-view-selector" @click="() => changeView('tracks')">Tracks</p>
                <p class="profile-view-selector" @click="() => changeView('playlist')">Playlist</p>
            </div>

            <div>
                <SessionsList v-if="viewname == 'sessions'" />
            </div>
        </section>
    </div>
</template>

<script>
import ProfileHead from "./profile-header/ProfileHead.vue";
import "./Profile.css"
import ApiUser from "../../apis/api.user"
import SessionsList from "./session-list/SessionsList.vue";

export default {
    name: "profile",
    components: { ProfileHead, SessionsList },

    data() {
        return {
            viewname: "sessions",
            user: undefined,
        };
    },

    mounted() {
        const params = (new URL(document.location)).searchParams;
        const pseudo = params.get("pseudo")

        if (pseudo == null && this.$store.state.user == null) this.$router.push("/")


        this.getUserInformations()
    },

    methods: {
        getUserInformations: async function () {
            const params = (new URL(document.location)).searchParams;
            const pseudo = params.get("pseudo")
            this.user = await ApiUser.get(pseudo)
            if (!this.user && !this.$store.state.user) return this.$router.push('/')
            console.log("USER:", this.user);
        },

        changeView: function (viewname) {
            this.viewname = viewname
        },

        isLogedInProfile: function () {
            const params = (new URL(document.location)).searchParams;
            const pseudo = params.get("pseudo")
            if (!this.$store.state.user && !pseudo) return this.$router.push('/')
            if (this.$store.state.user && this.$store.state.user.pseudo == pseudo) return true
            if (!pseudo && this.$store.state.user) return true
            else return false
        }
    },
};
</script>