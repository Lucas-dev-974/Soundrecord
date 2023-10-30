<template>
    <div class="playlist-item">
        <div class="playlist-item-head">
            <div class="line-fit edit-name">
                <div v-if="myProfile" class="line-fit">
                    <v-icon v-if="!onUpdate" :size="16" style="margin-top: 6px"
                        @click="updatePlaylistName">mdi-pencil</v-icon>
                    <v-icon v-else :size="16" style="margin-top: 6px" @click="() => onUpdate = false">mdi-check</v-icon>
                </div>
                <input v-on:keypress.enter="() => onUpdate = false" ref="playlistInputName" class="edit-name-input"
                    type="text" v-model="playlistName" disabled>
            </div>

            <div class="line-fit">
                <p>{{ playlist.tracks.count }} titres</p>
                <p class="line-fit" v-if="myProfile">
                    - public:
                    <SwitchToggler :checked="playlist.public" :onChange="updatePublic" />
                    -
                </p>
                <v-icon v-if="myProfile" @click="deletePlaylist" color="red" :size="18">mdi-trash-can</v-icon>
            </div>
            <div class="line-fit">
                <v-icon v-if="collapsed" @click="() => collapsed = false">mdi-chevron-down</v-icon>
                <v-icon v-else @click="() => collapsed = true">mdi-chevron-up</v-icon>
            </div>
        </div>
        <div class="playlist-collapse" :class="collapsed ? '' : 'active'">
            <div class="" v-for="track of playlist.tracks.rows" v-bind:key="track.id">
                <PlaylistTrackItem :track="track" />
            </div>
        </div>
    </div>
</template>

<script>

import "./PlaylistItem.css"
import PlaylistTrackItem from "../playlist-track-item/PlaylistTrackItem.vue";
import SwitchToggler from "../../sessions/switch-checkbox/SwitchToggler.vue";
import ApiPlaylist from "../../../../apis/api.playlist";

export default {
    components: { PlaylistTrackItem, SwitchToggler },
    props: {
        playlist: { required: true },
        removePlaylist: { required: true }
    },

    data() {
        return {
            collapsed: true, // CLosed
            collapseElement: undefined,
            playlistName: undefined,
            onUpdate: false,
            myProfile: false
        }
    },

    watch: {
        async onUpdate(newVal) {
            this.$refs.playlistInputName.disabled = !this.$refs.playlistInputName.disabled
            if (newVal) this.$refs.playlistInputName.focus()

            if (!newVal) {
                await ApiPlaylist.update({
                    playlistid: this.playlist.id,
                    field: "name",
                    value: this.playlistName
                })
            }
        }
    },

    mounted() {
        if (this.$store.state.user == "null" || this.$store.state.user == null || this.$store.state.user == undefined) {
            this.myProfile = false
        } else if (this.$store.state.user.id == this.playlist.userid) {
            this.myProfile = true
        } else this.myProfile = false
        this.playlistName = this.playlist.name
        console.log("my profile:", this.myProfile);
    },

    methods: {
        updatePlaylistName: async function () {
            this.onUpdate = !this.onUpdate
        },

        updatePublic: async function (value) {
            const response = await ApiPlaylist.update({
                playlistid: this.playlist.id,
                field: "public",
                value: String(value)
            })
            console.log(response);
        },

        deletePlaylist: async function () {
            const response = await ApiPlaylist.delete(this.playlist.id)
            console.log(response);
            this.removePlaylist(response.id)
        }
    }
}
</script>