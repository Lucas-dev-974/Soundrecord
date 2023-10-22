<template>
    <section class="profile-content-section">
        <header class="profile-content-header">
            <SearchBar onKeyPressEnter="sz" placeholder="Recherchez une session" :onInput="search" />
            <button @click="createPlaylist">Créer</button>
        </header>

        <div class="profile-content-content">
            <!-- List of  sessions -->
            <div v-for="playlist of playlists" :key="playlist.id">
                <PlaylistItem :playlist="playlist" />
            </div>
        </div>
    </section>
</template>

<script>

import ApiAudio from "../../../apis/api.audio.js"
import SearchBar from "../../../components/search-bar/SearchBar.vue"
import "./Playlist.css"
import PlaylistItem from "./playlist-item/PlaylistItem.vue"


export default {
    components: { SearchBar, PlaylistItem },
    data() {
        return {
            playlists: []
        }
    },

    mounted() {
        this.getPlaylists()
    },

    methods: {
        getPlaylists: async function () {
            const userPseudo = this.$store.state.userProfile ? this.$store.state.userProfile.user.pseudo : undefined
            const response = await ApiAudio.plailyst(userPseudo)
            this.playlists = response
        },

        search: function () {
            console.log("okokok search");
        },

        createPlaylist: function () {

        }
    }
}
</script>