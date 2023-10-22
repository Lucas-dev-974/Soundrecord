<template>
    <div class="playlist-track-item">
        <div class="playlist-track-img-container">
            <img class="playlist-track-img" :src="track.imagesrc" alt="playlist-track-image">
        </div>

        <div class="playlist-track-item-content">
            <div class="playlist-track-item-line-top">
                <p>{{ track.name }}</p>
                <p>
                    <v-icon class="audio-action-item" size="16">mdi-star-outline</v-icon>
                    {{ track.likes.count }}
                </p>
            </div>
            <div class="playlist-track-item-line-center">
                <PlayProgress :audioUrl="track.src" :onPlay="Playing" :onClickPlay="play" :onInputDuration="onInputDuration"
                    :on-grab-duration="onGrabDuration" :track="track" />

                <v-icon class="btn-icon" :size="18">mdi-trash-can</v-icon>
            </div>
            <div class="playlist-track-item-line-bottom">
                <div class="author-picture" @click="openAuthor">
                    <img :src="track.creator.picture" alt="">
                    <p>{{ track.creator.pseudo }} </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PlayProgress from "../../../simple-player/play-progress/PlayProgress.vue";
import SimpleAudioPlayer from "../../../../services/SimpleAudioPlayer";
import { trouverPourcentage, trouverValeurPourcentage } from "../../../../utils";
import "./PlaylistTrackItem.css"

export default {
    components: { PlayProgress },

    props: { track: { required: true } },

    data() {
        return {
            onPlay: false
        }
    },

    mounted() {
        const track = this.track
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
            SimpleAudioPlayer.play(this.track.src, this.track)
        },



        updatePublic: function () { },

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
            console.log("Playing", SimpleAudioPlayer.getCurrentAudio().src == this.track.src, this.onPlay);
            return this.onPlay && SimpleAudioPlayer.getCurrentAudio().src == this.track.src
        },

        openAuthor: function () {
            window.location.href = '/profile?pseudo=' + this.track.creator.pseudo
        }
    }
}

</script>