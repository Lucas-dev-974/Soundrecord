<template>
    <ul class="grid grid-x-6 audio-collection">
        <AudioItem :audio="audio" v-for="audio in audios" :key="audio.id" />
    </ul>
</template>

<script src="./list.js" />