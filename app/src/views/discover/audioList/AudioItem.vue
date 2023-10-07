<template>
    <li :class="'audio-container audio-' + audio.id">
        <img class="audio-image" :class="'img-' + audio.id" :src="audio.imagesrc" />
        <div class="audio-header">
            <div class="categories">
                <GenreTag :text="genre.name" v-for="genre of audio.categories" v-bind:key="genre.id" />
            </div>
            <a class="author-link" :href="'/profile?pseudo=' + audio.creator.pseudo" rel="noopener noreferrer">
                {{ audio.creator.pseudo }}
            </a>
        </div>
        <p :class="'audio-title audio-title-' + audio.id">{{ audio.name }}</p>

        <div class="audio-footer">

            <div class="audio-action">
                <v-icon @click="showComments" size="22">mdi-message-text-outline</v-icon>
                <v-icon class="audio-action-item" size="22" @click="like">mdi-star-outline</v-icon>
                {{ audio.likes.count }}
            </div>
        </div>
    </li>
</template>

<script src='./AudioItem.js' />