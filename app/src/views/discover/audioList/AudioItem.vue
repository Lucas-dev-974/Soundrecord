<template>
    <li id="audio-container">
        <img class="audio-image" :id="'img-' + audio.id" :src="audio.imagesrc" />
        <p id="audio-title">{{ audio.name }}</p>

        <div class="audio-footer">
            <a :href="'/profile?pseudo=' + audio.creator.pseudo" rel="noopener noreferrer">{{ audio.creator.pseudo }}</a>
            <div class="audio-action">
                <!-- <v-icon class="audio-action-item" @click="play(audio.src)">mdi-play</v-icon> -->
                {{ audio.likes }}
                <v-icon class="audio-action-item" size="20">mdi-star-outline</v-icon>
            </div>
        </div>
    </li>
</template>

<script src='./AudioItem.js' />