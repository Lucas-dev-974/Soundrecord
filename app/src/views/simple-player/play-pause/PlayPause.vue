<template>
    <div class="play-pause-container">

        <button class="play-btn" @click="onClick" v-if="!isPlaying">
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
        onPlay: { required: true },
        mode: { required: false } // global player
    },

    data() {
        return {
            isPlaying: this.onPlay()
        }
    },

    mounted() {
        console.log("isPlaying btn:", this.isPlaying);
        document.addEventListener('spl-play', () => {
            console.log("Mode:", this.mode, this.onPlay());
            if (this.mode == "global") this.isPlaying = !SimpleAudioPlayer.isPaused()
            else this.isPlaying = !SimpleAudioPlayer.isPaused() && this.onPlay()
        })

        document.addEventListener('spl-pause', () => {
            this.isPlaying = false;
            return
            // console.log("SPL Puase, isplaying:", this.isPlaying, "SPL paused:", SimpleAudioPlayer.isPaused());
            // if (this.mode == "global") this.isPlaying = !SimpleAudioPlayer.isPaused()
            // else this.isPlaying = !SimpleAudioPlayer.isPaused() && this.onPlay()
        })
    }
}
</script>