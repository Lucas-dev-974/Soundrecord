import SimpleAudioPlayer from "../../../services/SimpleAudioPlayer";
import "./AudioItem.css";

export default {
  name: "discover-item-list",

  props: {
    audio: { required: true },
  },

  async mounted() {
    const img = document.getElementById("img-" + this.audio.id);
    img.addEventListener('click', this.play)
    const audioItemcontainer = document.getElementById('audio-container')
    const title = document.getElementById('audio-title')

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
      await SimpleAudioPlayer.play(this.audio.src);
    },

    pause: function () {
      SimpleAudioPlayer.pause();
    },
  },
};
