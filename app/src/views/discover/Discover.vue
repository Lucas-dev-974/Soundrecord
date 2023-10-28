<template>
    <section>
        <div class="search-actions">
            <Searchbar :placeholder="'Rechercher une création'" @searchData="searchAudio" />
            <div class="categories-search-buttons">
                <p>catégories:</p>
                <div v-for="categorie of categories.datas" v-bind:key="categorie.id">
                    <GenreTag :text="categorie.name" :onClick="() => getAudiosByCategorie(categorie.id)" />
                </div>
            </div>
        </div>

        <div class="list-title-paging">
            <h3 class="list-title">Ecouté</h3>

            <Paging :totalPage="tracks.totalPages" :itemsPerPage="tracks.totalItems" :currentPage="tracks.currentPage"
                @changePage="onPageChange" />
        </div>
        <div class="audio-list-container" v-if="dataLoaded">
            <AudioList :audios="tracks.datas" />
        </div>
        <SimpleAudioPlayerComponent />
        <CommentsPanel :audioid="$store.state.commentsPanel.audio.id" />
    </section>
</template>

<script>
import ApiStore from "../../apis/api.store";
import Searchbar from "./searchbar/Searchbar.vue";
import SimpleAudioPlayer from "../../services/SimpleAudioPlayer";
import SimpleAudioPlayerComponent from "../simple-player/SimplePlayer.vue";
import Paging from "./paging/Paging.vue";
import "./Discover.css";
import AudioList from "./audioList/list.vue";
import CommentsPanel from "../../components/comments-panel/CommentsPanel.vue";
import GenreTag from "./genre-tag/GenreTag.vue";
import ApiCategorie from "../../apis/api.categories"
import apiAudio from "../../apis/api.audio";

export default {
    name: "discover",
    components: {
        SimpleAudioPlayerComponent,
        CommentsPanel,
        Searchbar,
        AudioList,
        GenreTag,
        Paging,
    },

    data() {
        return {
            tracks: {
                currentPage: 0,
                datas: [],
                totalItems: 0,
                totalPages: 0,
            },
            categories: [],
            page: "artists",
            searchKeyword: "",
            currentPageList: 0,
            dataLoaded: false,
        };
    },

    async mounted() {
        this.categories = await ApiCategorie.all()
        console.log("Categories:", this.categories);
        await this.getAudios();
        this.dataLoaded = true;
        const srcList = this.tracks.datas;
        SimpleAudioPlayer.setAudioList(srcList);
    },

    methods: {
        onPageChange: function (page) {
            console.log("on change  page");
            this.tracks.currentPage = page;
            this.getAudios();
        },

        getAudios: async function () {
            this.tracks = await ApiStore.all(this.tracks.currentPage);
        },

        play: async function () {
            await SimpleAudioPlayer.play();
        },

        searchAudio: async function (keywords) {
            console.log(keywords);
            if (keywords == "") this.getAudios();
            else {
                this.tracks = await ApiStore.search(keywords);
            }
        },

        getAudiosByCategorie: async function (categorie) {
            console.log("kkook");
            const response = await apiAudio.byCategorie(categorie)
            console.log("By categorie", response);
            this.tracks = response.tracks
        }
    },
};

</script>