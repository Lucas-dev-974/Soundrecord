<template>
    <section class="profile-content-section">
        <header class="profile-content-header">
            <SearchBar onKeyPressEnter="sz" placeholder="Recherchez une session" :onInput="search" />
            <button @click="uploadTrack">Importer</button>
        </header>

        <div class="profile-content-content">
            <div v-for="track of tracks" :key="track.id">
                <TrackItem :track="track" />
            </div>
        </div>
    </section>
</template>

<script>
import apiAudio from "../../../apis/api.audio"
import ApiSession from "../../../apis/api.session"
import SearchBar from "../../../components/search-bar/SearchBar.vue"
import TrackItem from "./track-item/TrackItem.vue"
import "./SessionList.css"
import SimpleAudioPlayer from "../../../services/SimpleAudioPlayer"

export default {
    components: { SearchBar, TrackItem },

    data() { return { tracks: [] } },
    mounted() { this.getTracks() },

    methods: {
        getTracks: async function () {
            const userPseudo = this.$store.state.userProfile ? this.$store.state.userProfile.user.pseudo : undefined
            const tracks = await apiAudio.library(userPseudo)
            this.tracks = tracks
            SimpleAudioPlayer.setAudioList(tracks)
        },

        search: async function (inputKeys) {
            if (inputKeys == "") return this.getTracks()
            const sessions = await ApiSession.search(inputKeys)
            this.tracks = sessions.datas
        },

        uploadTrack: function () {

        }
    }
}
</script>