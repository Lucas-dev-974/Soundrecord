<template>
    <section class="profile-content-section">
        <header class="profile-content-header">
            <Searchbar onKeyPressEnter="sz" placeholder="Recherchez une session" :onInput="search" />
            <button @click="uploadTrack">Importer</button>
        </header>

        <div class="profile-content-content">
            <div v-for="track of tracks.datas" :key="track.id">
                <TrackItem :track="track" :removeTrack="removeTrack" />
            </div>
        </div>
    </section>
</template>

<script>
import apiAudio from "../../../apis/api.audio"
import Searchbar from "../../discover/searchbar/Searchbar.vue"
import TrackItem from "./track-item/TrackItem.vue"
import "./SessionList.css"
import SimpleAudioPlayer from "../../../services/SimpleAudioPlayer"

export default {
    components: { Searchbar, TrackItem },

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
            const userPseudo = this.$store.state.userProfile ? this.$store.state.userProfile.user.pseudo : undefined
            if (inputKeys == "") return this.getTracks()
            const response = await apiAudio.library(userPseudo, inputKeys)
            this.tracks = response
        },

        uploadTrack: async function () {
            const input = document.createElement('input');
            input.type = 'file';
            const pushTrack = (track) => {
                this.tracks.push(track)
            }
            input.addEventListener('change', async () => {
                const files = Array.from(input.files);
                const formData = new FormData()
                formData.append('track', files[0])
                const response = await apiAudio.upload(formData)
                pushTrack(response)
            })

            input.click();

        },

        removeTrack: async function (trackid) {
            const trackIndex = this.tracks.findIndex(item => item.id == trackid)
            if (trackIndex == -1) return console.log("ERROR le track na pas été trouver");
            this.tracks = this.tracks.filter(item => item.id != trackid)
        }
    }
}
</script>