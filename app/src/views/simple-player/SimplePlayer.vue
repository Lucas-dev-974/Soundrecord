<template>
    <section id="simple-player-container">
        <div class="sp-content">
            <div class="line-fit progress-duration">
                <p ref="timer" class="timer-duration">00:00</p>
                <Progress :onInput="onInputDuration" :onPlay="isPlaying" :on-grab-duration="onGrabDuration"
                    :track="getTrack"></Progress>
            </div>
            <div class="play-container">
                <div class="line-fit">
                    <svg @click="previousMusic" width="18" height="14" viewBox="0 0 22 18" fill="none"
                        style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6.05772 8.5263C6.05714 8.30362 6.11878 8.08459 6.23665 7.89051C6.35452 7.69643 6.5246 7.53391 6.73036 7.41875L19.4822 0.193043C19.6972 0.0711002 19.9434 0.00452995 20.1955 0.000205994C20.4475 -0.00411797 20.6963 0.0539627 20.916 0.168449C21.1336 0.281157 21.3149 0.445522 21.4412 0.644646C21.5675 0.843769 21.6343 1.07046 21.6346 1.30141V15.7512C21.6343 15.9821 21.5675 16.2088 21.4412 16.4079C21.3149 16.6071 21.1336 16.7714 20.916 16.8841C20.6963 16.9986 20.4475 17.0567 20.1955 17.0524C19.9434 17.0481 19.6972 16.9815 19.4822 16.8596L6.73036 9.63384C6.5246 9.51869 6.35452 9.35616 6.23665 9.16208C6.11878 8.96801 6.05714 8.74898 6.05772 8.5263Z"
                            fill="white" fill-opacity="0.8" />
                        <path
                            d="M4.57764e-05 8.5263C-0.000537872 8.30362 0.0611019 8.08459 0.17897 7.89051C0.296839 7.69643 0.466925 7.53391 0.672687 7.41875L13.4245 0.193043C13.6395 0.0711002 13.8857 0.00452995 14.1378 0.000205994C14.3899 -0.00411797 14.6386 0.0539627 14.8583 0.168449C15.0759 0.281157 15.2572 0.445522 15.3835 0.644646C15.5098 0.843769 15.5766 1.07046 15.577 1.30141L15.577 15.7512C15.5766 15.9821 15.5098 16.2088 15.3835 16.4079C15.2572 16.6071 15.0759 16.7714 14.8583 16.8841C14.6386 16.9986 14.3899 17.0567 14.1378 17.0524C13.8857 17.0481 13.6395 16.9815 13.4245 16.8596L0.672687 9.63384C0.466925 9.51869 0.296839 9.35616 0.17897 9.16208C0.0611019 8.96801 -0.000537872 8.74898 4.57764e-05 8.5263Z"
                            fill="white" />
                    </svg>
                </div>
                <PlayPause :onClick="play" :onPlay="isPlaying" mode="global" />
                <div class="line-fit">
                    <svg @click="nextMusic" width="18" height="14" viewBox="0 0 22 18" fill="none"
                        xmlns="http://www.w3.org/2000/svg" style="cursor: pointer;">
                        <path
                            d="M15.9423 9.4737C15.9429 9.69638 15.8812 9.91541 15.7634 10.1095C15.6455 10.3036 15.4754 10.4661 15.2696 10.5813L2.5178 17.807C2.30281 17.9289 2.05657 17.9955 1.80452 17.9998C1.55247 18.0041 1.30374 17.946 1.08402 17.8316C0.866393 17.7188 0.685105 17.5545 0.558797 17.3554C0.432489 17.1562 0.36572 16.9295 0.365356 16.6986V2.24882C0.36572 2.01787 0.432489 1.79118 0.558797 1.59205C0.685105 1.39293 0.866393 1.22856 1.08402 1.11586C1.30374 1.00137 1.55247 0.943289 1.80452 0.947613C2.05657 0.951936 2.30281 1.01851 2.5178 1.14045L15.2696 8.36616C15.4754 8.48131 15.6455 8.64384 15.7634 8.83792C15.8812 9.03199 15.9429 9.25102 15.9423 9.4737Z"
                            fill="white" fill-opacity="0.8" />
                        <path
                            d="M22 9.4737C22.0005 9.69638 21.9389 9.91541 21.821 10.1095C21.7032 10.3036 21.5331 10.4661 21.3273 10.5813L8.57548 17.807C8.36049 17.9289 8.11425 17.9955 7.8622 17.9998C7.61015 18.0041 7.36142 17.946 7.1417 17.8316C6.92407 17.7188 6.74278 17.5545 6.61648 17.3554C6.49017 17.1562 6.4234 16.9295 6.42303 16.6986V2.24882C6.4234 2.01787 6.49017 1.79118 6.61648 1.59205C6.74278 1.39293 6.92407 1.22856 7.1417 1.11586C7.36142 1.00137 7.61015 0.943289 7.8622 0.947613C8.11425 0.951936 8.36049 1.01851 8.57548 1.14045L21.3273 8.36616C21.5331 8.48131 21.7032 8.64384 21.821 8.83792C21.9389 9.03199 22.0005 9.25102 22 9.4737Z"
                            fill="white" />
                    </svg>

                </div>
            </div>

            <div class="line-fit">
                <v-icon>mdi-volume-high</v-icon>
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
            progressBar: null,
            playInterval: undefined
        }
    },

    mounted() {
        document.addEventListener('keypress', event => {
            if (event.code === 'Space') {
                SimpleAudioPlayer.play()
            }
        })

        this.setEvent()
    },

    methods: {
        nextMusic: function () {
            SimpleAudioPlayer.next()
        },

        previousMusic: function () {
            SimpleAudioPlayer.previous()
        },

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

        play: function () {
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
                if (!hover()) {
                    ref.value = trouverPourcentage(SimpleAudioPlayer.getCurrentTime(), SimpleAudioPlayer.getDuration())
                }
            })
        },

        getTrack: function () {
            return SimpleAudioPlayer.currentAudio
        }
    }
}
</script>