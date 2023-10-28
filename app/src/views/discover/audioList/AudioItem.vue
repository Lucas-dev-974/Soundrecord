<template>
    <li :class="'audio-container audio-' + track.id">
        <img class="audio-image" :class="'img-' + track.id" :src="track.imagesrc" />
        <div class="audio-content">

            <p :class="'audio-title audio-title-' + track.id">{{ track.name }}</p>
            <div class="audio-header">
                <a class="author-link" :href="'/profile?pseudo=' + track.creator.pseudo" rel="noopener noreferrer">
                    {{ track.creator.pseudo }}
                </a>
                <div class="categories">
                    <GenreTag :text="genre.name" v-for="genre of track.categories" v-bind:key="genre.id" />
                </div>
            </div>

            <div class="audio-footer">
                <div class="audio-action">
                    <v-icon @click="showComments" size="22">mdi-message-text-outline</v-icon>
                    <v-icon class="audio-action-item" size="22" @click="like">mdi-star-outline</v-icon>
                    {{ track.likes.count }}
                </div>

                <AddToPlaylistDialog :track="track" />
            </div>
        </div>
    </li>
</template>

<script>
import SimpleAudioPlayer from "../../../services/SimpleAudioPlayer";
import ApiAudio from "../../../apis/api.audio"
import GenreTag from "../genre-tag/GenreTag.vue";
import "./AudioItem.css";
import AddToPlaylistDialog from "../add-to-playlists-dialog/AddToPlaylistDialog.vue";

export default {
    name: "discover-item-list",
    components: {
        GenreTag,
        AddToPlaylistDialog
    },

    props: {
        track: { required: true },
    },

    async mounted() {
        const img = document.getElementsByClassName("img-" + this.track.id)[0];
        img.addEventListener('click', this.play)
        const audioItemcontainer = document.getElementsByClassName('audio-container audio-' + this.track.id)[0]
        const title = document.getElementsByClassName('audio-title-' + this.track.id)[0]

        audioItemcontainer.addEventListener('mouseover', () => {
            title.classList.add("scrollingText")
        })

        audioItemcontainer.addEventListener('mouseover', () => {
            title.classList.remove("scrollingText")
        })
    },

    // TODO: add like method
    methods: {
        play: async function () {
            await SimpleAudioPlayer.play(this.track);
        },

        pause: function () {
            SimpleAudioPlayer.pause();
        },

        showComments: function () {
            this.$store.commit('setCommentsPanelAudio', this.track)
            this.$store.commit("toggleCommentsPanel")
        },

        like: async function () {
            const response = await ApiAudio.like(this.track.id)
            if (response[1]) {
                this.track.likes.count += 1
            } else {
                this.track.likes.count -= 1
            }
        },
    },
};
</script>