<template>
    <div class="session-item">
        <div class="session-img-container">
            <img class="session-img" :src="track.imagesrc" alt="session-image">
        </div>

        <div class="session-item-content">
            <div class="session-item-line-top">
                <p>{{ track.name }}</p>
            </div>
            <div class="session-item-line-center">
                <PlayProgress :audioUrl="track.src" :onPlay="Playing" :onClickPlay="play" :onInputDuration="onInputDuration"
                    :on-grab-duration="onGrabDuration" :track="track" />
            </div>
            <div class="session-item-line-bottom">
                <p class="line-fit">public:
                    <SwitchToggler :checked="true" @onChange="updatePublic"></SwitchToggler>
                </p>
                <p>créer: {{ track.createdAt.substring(0, 10) }} </p>
                <p>
                    <v-icon class="audio-action-item" size="22">mdi-star-outline</v-icon>
                    {{ track.likes.count }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import "./SessionItem.css"
import SwitchToggler from "../switch-checkbox/SwitchToggler.vue"
import PlayProgress from "../../../simple-player/play-progress/PlayProgress.vue";
import SimpleAudioPlayer from "../../../../services/SimpleAudioPlayer";
import { trouverPourcentage, trouverValeurPourcentage } from "../../../../utils";

export default {
    components: { SwitchToggler, PlayProgress },

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
        }
    }
}

</script>