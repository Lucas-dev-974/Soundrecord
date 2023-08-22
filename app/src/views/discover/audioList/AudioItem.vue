<template>
    <li class="audio-container">
        <img :class="'audio-image img-' + audio.id" />
        <p class="audio-title">{{ audio.name }}</p>
        <div class="audio-action">
            <v-icon class="audio-action-item" @click="play(audio.src)">mdi-play</v-icon>
            <v-icon class="audio-action-item">mdi-star-outline</v-icon>
        </div>
    </li>
</template>

<script src='./AudioItem.js' />