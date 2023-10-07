import ApiStore from "../../apis/api.store";
import Searchbar from "./searchbar/Searchbar.vue";
import SimpleAudioPlayer from "../../services/SimpleAudioPlayer";
import SimpleAudioPlayerComponent from "../simple-player/SimplePlayer.vue";
import Paging from "./paging/Paging.vue";
import "./Discover.css";
import AudioList from "./audioList/list.vue";
import CommentsPanel from "../../components/comments-panel/CommentsPanel.vue";
import GenreTag from "./genre-tag/GenreTag.vue"

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
        currentPage: Number,
        datas: [],
        totalItems: Number,
        totalPages: Number
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
  },

  methods: {
    onPageChange: function (page) {
      console.log("on change  page");
      this.audios.currentPage = page;
      this.getAudios();
    },

    getAudios: async function () {
      this.audios = await ApiStore.all(this.audios.currentPage);
      console.log(this.audios);
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
