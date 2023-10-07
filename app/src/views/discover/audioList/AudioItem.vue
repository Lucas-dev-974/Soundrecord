<template>
    <li :class="'audio-container audio-' + audio.id">
        <img class="audio-image" :class="'img-' + audio.id" :src="audio.imagesrc" />
        <GenreTag :text="'test'" />
        <p :class="'audio-title audio-title-' + audio.id">{{ audio.name }}</p>

        <div class="audio-footer">
            <a :href="'/profile?pseudo=' + audio.creator.pseudo" rel="noopener noreferrer">{{ audio.creator.pseudo }}</a>
            <div class="audio-action">
                <v-icon @click="showComments">mdi-message-text-outline</v-icon>
                <!-- <v-icon class="audio-action-item" @click="play(audio.src)">mdi-play</v-icon> -->
                {{ audio.likes.count }}
                <v-icon class="audio-action-item" size="20" @click="like">mdi-star-outline</v-icon>
            </div>
        </div>
    </li>
</template>

<script src='./AudioItem.js' />