<template>
    <ul class="grid audio-collection">
        <AudioItem :audio="audio" v-for="audio in audios" :key="audio.id" />
    </ul>
</template>

<script src="./list.js" />