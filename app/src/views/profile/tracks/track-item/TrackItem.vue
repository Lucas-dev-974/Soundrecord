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
            trackName: "defaultnamùe",
            onUpdate: false
        }
    },

    mounted() {
        this.trackName = this.track.name
    },

    methods: {
        // TODO to complete 
        play: function () {
            SimpleAudioPlayer.play(this.track)
            console.log("PLAY CLICK SPL state:", SimpleAudioPlayer.getCurrentAudio().id == this.track.id);
        },



        updatePublic: async function (value) {
            await apiAudio.update({
                trackid: this.track.id,
                fields: "public",
                datas: String(value)
            })
        },

        // TODO: To review, when import track to locate track in server create new field <filename>
        updateTrackName: async function () {
            if (this.track.name != this.trackName) {
                await apiAudio.update({
                    trackid: this.track.id,
                    fields: "name",
                    datas: String(this.trackName)
                })
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
            if (!SimpleAudioPlayer.getCurrentAudio()) return false
            console.log("TRACK PLAYING:", !SimpleAudioPlayer.isPaused() && SimpleAudioPlayer.getCurrentAudio().id == this.track.id)
            return !SimpleAudioPlayer.isPaused() && SimpleAudioPlayer.getCurrentAudio().id == this.track.id
        }
    }
}

</script>