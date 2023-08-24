<template>
    <div class="play-pause-container">
        <v-icon @click="play" v-if="!onPlay">
            mdi-play
        </v-icon>

        <v-icon @click="pause" v-else>
            mdi-pause
        </v-icon>
    </div>
</template>

<script src="./PlayPause"></script>