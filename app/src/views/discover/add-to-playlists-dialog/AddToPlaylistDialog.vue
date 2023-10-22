<template>
    <div>
        <v-icon v-if="$store.state.user" @click="toggleDialog">mdi-playlist-plus</v-icon>
        <div v-if="openDialog" class="dialog-layout" @click="layoutClick">
            <div id="playlist-dialog" class="dialog-content">
                <p class="dialog-title">Playlists</p>
                <div class="separator" />

                <PlaylistList :playlists="playlists" :track="track" :updateTrackInPlaylist="updateTrackInPlaylist" />
            </div>
        </div>
    </div>
</template>

<script>
import ApiPlaylist from "../../../apis/api.playlist"
import "./AddToPlaylistDialog.css"
import PlaylistList from "./playlist-list/PlaylistList.vue";

export default {
    props: {
        track: { required: true },
    },

    data() {
        return {
            openDialog: false,
            playlists: [],
            clickOutside: true,
            refContent: undefined
        };
    },

    methods: {
        setRefContent: async function () {
            if (!this.refContent) return
            const setClickOutside = (value) => this.clickOutside = value;

            this.refContent.addEventListener('mouseover', () => setClickOutside(false));
            this.refContent.addEventListener('mouseout', () => setClickOutside(true));
            this.refContent.addEventListener('focus', () => setClickOutside(false));
            this.refContent.addEventListener('focusin', () => setClickOutside(false));
            this.refContent.addEventListener('focusout', () => setClickOutside(false));
            await this.getPlaylist();

            return
        },
        getPlaylist: async function () {
            const response = await ApiPlaylist.playlists(this.$store.state.user.pseudo);
            this.playlists = response;
        },

        toggleDialog: function () {
            if (this.openDialog) this.openDialog = false
            else {
                this.openDialog = true
                setTimeout(async () => {
                    this.refContent = document.getElementById('playlist-dialog')
                    await this.setRefContent()
                }, 0)
            }
        },

        layoutClick: function () {
            if (this.clickOutside) {
                this.openDialog = false;
            }
        },

        updateTrackInPlaylist: function (operator, association) {
            const playlistIndex = this.playlists.findIndex(item => item.id == association.playlistid)
            if (playlistIndex == -1) return console.log("ERROR playlist non existante");

            if (!operator) {
                const trackIndex = this.playlists[playlistIndex].tracks.rows.findIndex(item => item.id == association.audioid)
                if (trackIndex == -1) return console.log("ERROR l'audio na pas été trouver dans la playlist");
                delete this.playlists[playlistIndex].tracks.rows[trackIndex]
            } else {
                this.playlists[playlistIndex].tracks.rows.push({ id: association.audioid })
            }
        }
    },
    components: { PlaylistList }
}
</script>