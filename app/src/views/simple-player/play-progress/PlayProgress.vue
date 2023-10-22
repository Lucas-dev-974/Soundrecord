<template>
    <div class="play-progress">
        <PlayPause :on-click="onClickPlay" :on-play="onPlay" />
        <Progress :on-input="onInputDuration" :on-play="onPlay" :on-grab-duration="onGrabDuration" :track="track" />
    </div>
</template>

<script>
import PlayPause from '../play-pause/PlayPause.vue';
import Progress from '../progress-bar/Progress.vue';
import "./PlayProgress.css"

export default {
    components: { Progress, PlayPause },
    props: {
        onPlay: { required: true },
        onClickPlay: { required: true },
        onInputDuration: { required: true },
        onGrabDuration: { required: true },
        track: { required: true }
    },
}

</script>