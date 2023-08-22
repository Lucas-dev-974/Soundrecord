import SimpleAudioPlayer from "../../../services/SimpleAudioPlayer";
import "./AudioItem.css";

export default {
  name: "discover-item-list",

  props: {
    audio: { required: true },
  },

  async mounted() {
    const img = document.getElementsByClassName("img-" + this.audio.id)[0];
    console.log(img);
    img.setAttribute("src", this.audio.imagesrc);
    // img.src = this.audio.imagesrc;
    img.style.background = "url('" + this.audio.imagesrc + "')";
  },

  // TODO: add like method
  methods: {
    play: async function () {
      await SimpleAudioPlayer.play(this.audio.src);
    },

    pause: function () {
      SimpleAudioPlayer.pause();
    },
  },
};
