import ApiStore from "../../apis/api.store";
import Searchbar from "./searchbar/Searchbar.vue";
import SimpleAudioPlayer from "../../services/SimpleAudioPlayer";
import SimpleAudioPlayerComponent from "../simple-player/SimplePlayer.vue";
import Paging from "./paging/Paging.vue";
import "./Discover.css";
import AudioList from "./audioList/list.vue";

export default {
  name: "discover",
  components: { AudioList, Searchbar, Paging, SimpleAudioPlayerComponent },

  data() {
    return {
      audios: [],
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
      this.audios.currentPageList = page;
      this.getAudios();
    },

    getAudios: async function () {
      this.audios = await ApiStore.all(this.currentPageList);
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
