<template>
    <section class="profile-content-section">
        <header class="profile-content-header">
            <Searchbar onKeyPressEnter="search" placeholder="Recherchez une playlist" :onInput="search" />
            <button @click="createPlaylistOpenDialog">Créer</button>
            <div class="dialog-input-container" :class="onCreate ? 'active' : ''">
                <input ref="newPlayListNameInput" class="dialog-input" v-model="playlistName"
                    v-on:keyup.enter="handleEnterOfCreateInput" type="text" placeholder="Nom de la nouvelle playlist.">
            </div>
        </header>

        <div class="profile-content-content">
            <!-- List of  sessions -->
            <div v-for="playlist of playlists" :key="playlist.id">
                <PlaylistItem :playlist="playlist" :removePlaylist="removePlaylist" />
            </div>
        </div>
    </section>
</template>

<script>
import ApiAudio from "../../../apis/api.audio.js"
import ApiPlaylist from "../../../apis/api.playlist"
import Searchbar from "../../discover/searchbar/Searchbar.vue"



import "./Playlist.css"
import PlaylistItem from "./playlist-item/PlaylistItem.vue"


export default {
    components: { Searchbar, PlaylistItem },
    data() {
        return {
            playlists: [],
            onCreate: false,
            playlistName: "Nom par défaut"
        }
    },

    mounted() {
        this.getPlaylists()
        this.$refs.newPlayListNameInput.addEventListener('focusout', () => {
            this.onCreate = false
        })
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

        createPlaylistOpenDialog: function () {
            console.log("onCreate:", this.onCreate);
            this.onCreate = !this.onCreate
            this.$refs.newPlayListNameInput.focus()
        },

        handleEnterOfCreateInput: async function () {
            const response = await ApiPlaylist.create(this.playlistName)
            this.playlists.push(response)
            this.playlistName = "Nom par défaut"
            this.onCreate = false
        },

        removePlaylist(playlistid) {
            const playlistIndex = this.playlists.findIndex(item => item.id == playlistid)
            if (playlistIndex == -1) return console.log("WARNING: la playlist à supprimer ne fait pas parti des playlist charger localement");
            this.playlists = this.playlists.filter(item => item.id != playlistid)
        }
    }
}
</script>