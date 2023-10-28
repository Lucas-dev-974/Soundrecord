<template>
    <div class="track-item">
        <div class="track-img-container">
            <img class="track-img" :src="track.imagesrc" alt="track-image">
        </div>

        <div class="track-item-content">
            <div class="track-item-line-top">
                <div class="track-item-name-actions">
                    <!-- TODO: to review -->
                    <v-icon @click="updateTrackName"
                        v-if="$store.state.userProfile && $store.state.userProfile.isMyProfile && !onUpdate"
                        :size="14">mdi-pencil</v-icon>

                    <v-icon @click="updateTrackName"
                        v-if="$store.state.userProfile && $store.state.userProfile.isMyProfile && onUpdate"
                        :size="16">mdi-check</v-icon>

                    <input class="track-name-input" v-on:keypress.enter="updateTrackName" v-model="trackName"
                        ref="refNameInput" type="text" disabled>
                    <!-- <p>{{ track.name }}</p> -->
                </div>
                <div class="line-fit">
                    <v-icon @click="deleteTrack" :size="18" color="red">mdi-trash-can</v-icon>
                    <p class="line-fit">
                        <v-icon class="audio-action-item" size="22">mdi-star-outline</v-icon>
                        {{ track.likes.count }}
                    </p>
                </div>
            </div>
            <div class="track-item-line-center">
                <PlayProgress :audioUrl="track.src" :onPlay="Playing" :onClickPlay="play" :onInputDuration="onInputDuration"
                    :on-grab-duration="onGrabDuration" :track="track" />
            </div>
            <div class="track-item-line-bottom">
                <div>
                    <p class="line-fit" v-if="$store.state.userProfile && $store.state.userProfile.isMyProfile">
                        public: <SwitchToggler :checked="track.public" :onChange="updatePublic"></SwitchToggler>
                    </p>
                </div>
                <p>créer: {{ track.createdAt.substring(0, 10) }} </p>

            </div>
        </div>
    </div>
</template>

<script>
import "./TrackItem.css"
import SwitchToggler from "../switch-checkbox/SwitchToggler.vue"
import PlayProgress from "../../../simple-player/play-progress/PlayProgress.vue";
import SimpleAudioPlayer from "../../../../services/SimpleAudioPlayer";
import { trouverPourcentage, trouverValeurPourcentage } from "../../../../utils";

import apiAudio from "../../../../apis/api.audio";


export default {
    components: { SwitchToggler, PlayProgress },

    props: {
        track: { required: true },
        removeTrack: { required: true }
    },

    data() {
        return {
            onPlay: false,
            trackName: "defaultnamùe",
            onUpdate: false
        }
    },

    mounted() {
        const track = this.track
        this.trackName = this.track.name
        const setOnPlay = (value) => this.onPlay = value

        document.addEventListener('spl-play', () => {
            if (track.src == SimpleAudioPlayer.getCurrentAudio().src)
                setOnPlay(true)
        })

        document.addEventListener('spl-play', () => {
            if (track.src == SimpleAudioPlayer.getCurrentAudio().src)
                setOnPlay(false)
        })
    },

    methods: {
        // TODO to complete 
        play: function () {
            if (this.onPlay) this.onPlay = false
            else this.onPlay = true
            SimpleAudioPlayer.play(this.track)
        },



        updatePublic: async function (value) {
            console.log("public upate");
            const response = await apiAudio.update({
                trackid: this.track.id,
                fields: "public",
                datas: String(value)
            })

            console.log(response);
        },

        // TODO: To review, when import track to locate track in server create new field <filename>
        updateTrackName: async function () {
            if (this.track.name != this.trackName) {
                console.log("update");
                const response = await apiAudio.update({
                    trackid: this.track.id,
                    fields: "name",
                    datas: String(this.trackName)
                })

                console.log(response);
            }
            this.onUpdate = !this.onUpdate
            if (this.onUpdate) {
                this.$refs.refNameInput.disabled = false
                this.$refs.refNameInput.focus()
            } else {
                this.$refs.refNameInput.disabled = true
            }
        },

        deleteTrack: async function () {
            const response = await apiAudio.delete(this.track.id)
            if (!response) return console.log("Error lors de la suppression d'un track");
            await this.removeTrack(response)
        },

        onInputDuration: function (ref, hover) {
            SimpleAudioPlayer.setFallback(() => {
                if (!hover()) {
                    ref.value = trouverPourcentage(SimpleAudioPlayer.getCurrentTime(), SimpleAudioPlayer.getDuration())
                }
            })
        },

        onGrabDuration: function (durationPercent) {
            const durationValue = trouverValeurPourcentage(durationPercent, SimpleAudioPlayer.getDuration())
            SimpleAudioPlayer.setCurrentTime(durationValue)
        },

        Playing: function () {
            return this.onPlay && SimpleAudioPlayer.getCurrentAudio().src == this.track.src
        }
    }
}

</script>