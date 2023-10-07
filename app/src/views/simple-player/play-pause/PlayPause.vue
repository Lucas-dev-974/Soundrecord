<template>
    <div class="play-pause-container">

        <button class="play-btn" @click="play" v-if="!onPlay">
            <PlayIcon />
        </button>

        <v-icon @click="pause" v-else>
            mdi-pause
        </v-icon>
    </div>
</template>

<script src="./PlayPause"></script>