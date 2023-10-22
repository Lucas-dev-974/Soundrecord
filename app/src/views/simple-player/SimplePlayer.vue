<template>
    <section id="simple-player-container">
        <div class="sp-content">
            <div class="play-container">
                <PlayPause :onClick="play" :onPlay="Playing" />
            </div>
            <p class="timer-duration">00:00</p>
            <Progress :onInput="onInputDuration" :onPlay="() => true" :on-grab-duration="onGrabDuration"
                :track="getTrack"></Progress>

            <div class="line-fit">
                <VolumeSlider />
            </div>
        </div>
    </section>
</template>

<script>
import "./SimplePlayer.css"
import SimpleAudioPlayer from "../../services/SimpleAudioPlayer"
import VolumeSlider from "./volume-slider/VolumeSlider.vue"
import PlayPause from "./play-pause/PlayPause.vue"
import Progress from "./progress-bar/Progress.vue"
import { trouverPourcentage, trouverValeurPourcentage } from "../../utils"

export default {
    components: {
        VolumeSlider, PlayPause, Progress
    },

    data() {
        return {
            onPlay: false,
            intervals: [],
            progressBar: null
        }
    },

    mounted() {
        document.addEventListener('keypress', event => {
            if (event.code === 'Space') {
                if (SimpleAudioPlayer.paused) SimpleAudioPlayer.play()
                else SimpleAudioPlayer.pause()
            }

        })

        document.addEventListener('DOMContentLoaded', () => {
            if (this.progressBar == null) {
                try {
                    this.progressBar = document.getElementById('spl-progress')
                } catch (error) {
                    console.log("la progress na pas été trouver");
                }
            }
        })

        this.setEvent(this.setOnPlay)
    },

    methods: {
        setEvent: function (callback) {
            document.addEventListener('spl-play', function () {
                callback(true)
            })

            document.addEventListener('spl-pause', function () {
                callback(false)
                SimpleAudioPlayer.clearGlobalFallback()
            })
        },

        setOnPlay: function (value) {
            this.onPlay = value
        },

        play: function () {
            console.log(SimpleAudioPlayer.getAudioList());
            // if (!this.onPlay) this.onPlay = true
            // else this.onPlay = false
            SimpleAudioPlayer.play()
        },

        Playing: function () {
            return this.onPlay
        },

        onGrabDuration: function (durationPercent) {
            const durationValue = trouverValeurPourcentage(durationPercent, SimpleAudioPlayer.getDuration())
            SimpleAudioPlayer.setCurrentTime(durationValue)
        },

        onInputDuration: function (ref, hover) {
            SimpleAudioPlayer.setGlobalFallback(() => {
                if (!hover())
                    ref.value = trouverPourcentage(SimpleAudioPlayer.getCurrentTime(), SimpleAudioPlayer.getDuration())

            })
        },

        getTrack: function () {
            return SimpleAudioPlayer.currentAudio
        }

    }
}
</script>