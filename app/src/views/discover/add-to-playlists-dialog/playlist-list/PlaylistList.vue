<template>
    <span>
        <div v-for="playlist of playlists" v-bind:key="playlist.id">
            <PlaylistListItem :playlist="playlist" :track="track" :updateTrackInPlaylist="updateTrackInPlaylist" />
        </div>
    </span>
</template>

<script>
import PlaylistListItem from '../playlist-list-item/PlaylistListItem.vue';


export default {
    props: {
        playlists: { required: true },
        track: { required: true },
        updateTrackInPlaylist: { required: true }
    },

    components: { PlaylistListItem }
}
</script>