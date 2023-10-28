<template>
    <section>
        <div class="search-actions">
            <Searchbar :placeholder="'Rechercher une création'" @searchData="searchAudio" />
            <div class="categories-search-buttons">
                <p>catégories:</p>
                <GenreTag :text="'Old-school'" :onClick="() => { }" />
            </div>
        </div>

        <div class="list-title-paging">
            <h3 class="list-title">Ecouté</h3>

            <Paging :totalPage="audios.totalPages" :itemsPerPage="audios.totalItems" :currentPage="audios.currentPage"
                @changePage="onPageChange" />
        </div>
        <div class="audio-list-container" v-if="dataLoaded">
            <AudioList :audios="audios.datas" />
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
            audios: {
                currentPage: 0,
                datas: [],
                totalItems: 0,
                totalPages: 0,
            },
            page: "artists",
            searchKeyword: "",
            currentPageList: 0,
            dataLoaded: false,
        };
    },

    async mounted() {
        await this.getAudios();
        this.dataLoaded = true;
        const srcList = this.audios.datas.map((audio) => audio.src);
        SimpleAudioPlayer.setAudioList(srcList);
        console.log(SimpleAudioPlayer.getAudioList());
    },

    methods: {
        onPageChange: function (page) {
            console.log("on change  page");
            this.audios.currentPage = page;
            this.getAudios();
        },

        getAudios: async function () {
            this.audios = await ApiStore.all(this.audios.currentPage);
        },

        play: async function () {
            await SimpleAudioPlayer.play();
        },

        searchAudio: async function (keywords) {
            console.log(keywords);
            if (keywords == "") this.getAudios();
            else {
                this.audios = await ApiStore.search(keywords);
            }
        },
    },
};

</script>