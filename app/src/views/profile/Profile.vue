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
                <SessionsList v-if="viewname == 'sessions' && isLogedInProfile()" :sessionsProps="sessions"
                    :is-my-profile="isLogedInProfile()" />

                <div v-if="viewname == 'tracks'">
                    <TracksList />
                    <SimplePlayer />
                </div>

                <Playlist v-if="viewname == 'playlist'" />
            </div>
        </section>
    </div>
</template>

<script>
import ProfileHead from "./sessions/profile-header/ProfileHead.vue";
import "./Profile.css"
import ApiUser from "../../apis/api.user"
import SessionsList from "./sessions/SessionsList.vue";
import TracksList from "./tracks/TracksList.vue";
import SimplePlayer from "../simple-player/SimplePlayer.vue";
import Playlist from "./playlist/Playlist.vue";

export default {
    name: "profile",
    components: { ProfileHead, SessionsList, TracksList, SimplePlayer, Playlist },

    data() {
        return {
            viewname: "sessions",
            user: undefined,
            sessions: [],
            tracks: [],
            playlist: []
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
            let pseudo = params.get("pseudo")
            if (!this.user && !this.$store.state.user && !pseudo) return this.$router.push('/')
            if (!pseudo) pseudo = this.$store.state.user.pseudo

            this.user = await ApiUser.profile(pseudo)
            this.sessions = this.user.sessions
            this.tracks = this.user.tracks
            this.playlists = this.user.playlists

            if (!this.isLogedInProfile()) this.viewname = "tracks"
            else this.viewname = "sessions"
            console.log(this.viewname);
            // Todo review the fact of use userProfile in store instead of datas
            this.$store.commit('setUserProfile', { user: this.user, isMyProfile: this.isLogedInProfile() })
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