<template>
    <input :ref="(ref) => inputRef = ref" @input="onInputHandler" @change="onChange" type="range" min="0" max="100"
        value="0" step="0.01" class="progress-input spl-progress">
</template>

<script>
import SimpleAudioPlayer from "../../../services/SimpleAudioPlayer"
import "./Progress.css"

export default {
    props: {
        onInput: { required: true },
        onPlay: { required: true },
        onGrabDuration: { required: true },
        track: { required: true }
    },

    data() {
        return {
            inputRef: undefined,
            onHover: false
        }
    },

    mounted() {
        document.addEventListener('spl-play', () => {
            if (this.onPlay() || this.track.src == SimpleAudioPlayer.currentAudio.src) {
                this.onInput(this.inputRef, this.hover)
            }
        })

        document.addEventListener('spl-pause', () => {
            if (!this.onPlay()) {
                SimpleAudioPlayer.clearFallback()
            }
        })
    },

    methods: {
        onChange: function () {
            this.onHover = false
        },

        onInputHandler: function (event) {
            this.onHover = true
            this.onGrabDuration(event.target.value)
        },

        hover: function () {
            return this.onHover
        }
    }
}
</script>