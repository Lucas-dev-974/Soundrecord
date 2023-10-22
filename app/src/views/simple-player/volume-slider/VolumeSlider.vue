
<template>
    <input :ref="(event) => inputRef = event" type="range" class="volume-range-input" min="0" max="1" step="0.01" value="1">
</template>

<script>
import SimpleAudioPlayer from "../../../services/SimpleAudioPlayer";
import "./VolumeSlider.css"

export default {
    data() {
        return { inputRef: null }
    },

    mounted() {
        this.inputRef.addEventListener('input', () => {
            const volume = this.inputRef.value;
            SimpleAudioPlayer.setVolume(volume);
        });
    },
}
</script>