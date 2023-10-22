<template>
    <div class="line justify-between">
        <label :for="'playlist-' + playlist.id">{{ playlist.name }}</label>
        <input ref="inputRef" :id="'playlist-' + playlist.id" type="checkbox" v-model="inPlaylist" @click="onClick">
    </div>
</template>

<script>
import ApiPlaylist from '../../../../apis/api.playlist'

export default {
    props: {
        playlist: { required: true },
        track: { required: true },
        updateTrackInPlaylist: { required: true }
    },

    data() {
        return {
            inPlaylist: false,
            refInput: undefined,
            bufferTrack: undefined,
        }
    },

    async mounted() {
        this.bufferTrack = this.track
        this.inPlaylist = await this.isInPlaylist()
    },

    methods: {
        isInPlaylist: async function () {
            const track = await this.playlist.tracks.rows.find(item => item.id == this.bufferTrack.id)
            return track != undefined
        },

        onClick: async function () {
            if (this.inPlaylist) {
                this.inPlaylist = false
                const resonse = await ApiPlaylist.removeTrack(this.playlist.id, this.bufferTrack.id)
                if (!resonse) console.log("Une erreur et survenue lors de l'ajout d'un track à une playlist");
                this.updateTrackInPlaylist(this.inPlaylist, resonse)

            }
            else {
                this.inPlaylist = true
                const resonse = await ApiPlaylist.appendTrack(this.playlist.id, this.bufferTrack.id)
                if (!resonse) console.log("Une erreur et survenue lors de l'ajout d'un track à une playlist");
                this.updateTrackInPlaylist(this.inPlaylist, resonse)
            }
        }
    }
}
</script>