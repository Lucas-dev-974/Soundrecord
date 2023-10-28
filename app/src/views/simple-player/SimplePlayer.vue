<template>
    <section id="simple-player-container">
        <div class="sp-content">
            <div class="play-container">
                <PlayPause :onClick="play" :onPlay="isPlaying" />
            </div>
            <p ref="timer" class="timer-duration">00:00</p>
            <Progress :onInput="onInputDuration" :onPlay="isPlaying" :on-grab-duration="onGrabDuration"
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

function convertTime(time) {
    var mins = Math.floor(time / 60);
    if (mins < 10) {
        mins = '0' + String(mins);
    }
    var secs = Math.floor(time % 60);
    if (secs < 10) {
        secs = '0' + String(secs);
    }

    return mins + ':' + secs;
}

export default {
    components: {
        VolumeSlider, PlayPause, Progress
    },

    data() {
        return {
            onPlay: false,
            progressBar: null,
            playInterval: undefined
        }
    },

    mounted() {
        document.addEventListener('keypress', event => {
            if (event.code === 'Space') {
                if (SimpleAudioPlayer.paused) SimpleAudioPlayer.play()
                else SimpleAudioPlayer.pause()
            }

        })

        this.setEvent()
    },

    methods: {
        setEvent: function () {
            const refTimer = this.$refs.timer
            document.addEventListener('spl-play', function () {
                this.playInterval = setInterval(() => {
                    const playingDuration = convertTime(SimpleAudioPlayer.getPlayingMinutes())
                    refTimer.textContent = String(playingDuration)
                }, 100)
            })

            document.addEventListener('spl-pause', function () {
                SimpleAudioPlayer.clearGlobalFallback()
                clearInterval(this.playInterval)
            })
        },

        setOnPlay: function (value) {
            console.log("okoko", value);
        },

        play: function () {
            console.log(SimpleAudioPlayer.getAudioList());
            SimpleAudioPlayer.play()
        },

        isPlaying: function () {
            return SimpleAudioPlayer.isPaused()
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