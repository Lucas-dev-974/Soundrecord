import ApiStore from "../../apis/api.store";
import artists from "../../components/discover/artist.vue";
import songs from "../../components/discover/song.vue";
import Searchbar from "./searchbar/Searchbar.vue";
import SimpleAudioPlayer from "../../services/SimpleAudioPlayer";
import Paging from "./paging/Paging.vue";
import "./Discover.css";

export default {
  name: "discover",
  components: { artists, songs, Searchbar, Paging },

  data() {
    return {
      audios: [],
      page: "artists",
      searchKeyword: "",
    };
  },

  async mounted() {
    await this.getAudios();
    const srcList = this.audios.datas.map((audio) => audio.src);
    SimpleAudioPlayer.setAudioList(srcList);
  },

  methods: {
    onPageChange: function (page) {
      console.log(page);
      this.audios.currentPage = page;
    },

    getAudios: async function () {
      this.audios = await ApiStore.all(this.currentPage);
      console.log(this.audios);
    },

    play: async function () {
      await SimpleAudioPlayer.play();
    },

    pause: function () {
      SimpleAudioPlayer.pause();
    },
  },
};
