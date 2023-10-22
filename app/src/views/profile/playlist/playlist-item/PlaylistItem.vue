<template>
    <div class="playlist-item">
        <div class="playlist-item-head">
            <p>{{ playlist.name }}</p>
            <p>Titres: {{ playlist.tracks.count }}</p>
            <SwitchToggler :checked="playlist.public" />
            <button v-if="collapsed" @click="() => collapsed = false">
                <v-icon>mdi-chevron-down</v-icon>
            </button>
            <button v-else @click="() => collapsed = true">
                <v-icon>mdi-chevron-up</v-icon>
            </button>
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

export default {
    components: { PlaylistTrackItem, SwitchToggler },
    props: {
        playlist: { required: true }
    },

    data() {
        return {
            collapsed: true, // CLosed
            collapseElement: undefined
        }
    },

    mounted() {
        console.log("Playlist item mounted", this.playlist);
    },

    methods: {
        updatePublic: function () {
            console.log("update public");
            this.playlist.public = !this.playlist.public
        }
    }
}
</script>