<template>
    <div class="play-pause-container">

        <button class="play-btn" @click="onClick" v-if="!onplay">
            <PlayIcon />
        </button>

        <v-icon @click="onClick" v-else>
            mdi-pause
        </v-icon>
    </div>
</template>

<script>
import PlayIcon from "../../../icons/PlayIcon.vue"
import SimpleAudioPlayer from "../../../services/SimpleAudioPlayer"
import "./PlayPause.css"

export default {
    components: { PlayIcon },

    props: {
        onClick: { required: true },
        onPlay: { required: true }
    },

    data() {
        return {
            onplay: this.onPlay()
        }
    },

    mounted() {
        document.addEventListener('spl-play', () => {
            this.onplay = !SimpleAudioPlayer.isPaused()
        })

        document.addEventListener('spl-pause', () => {
            this.onplay = !SimpleAudioPlayer.isPaused()
        })
    }
}
</script>