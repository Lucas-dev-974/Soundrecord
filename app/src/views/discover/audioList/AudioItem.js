import SimpleAudioPlayer from "../../../services/SimpleAudioPlayer";
import "./AudioItem.css";
import ApiAudio from "../../../apis/api.audio"
import GenreTag from "../genre-tag/GenreTag.vue";

export default {
  name: "discover-item-list",
  components: {
    GenreTag
  },

  props: {
    audio: { required: true },
  },

  async mounted() {
    console.log(this.audio);
    const img = document.getElementsByClassName("img-" + this.audio.id)[0];
    img.addEventListener('click', this.play)
    const audioItemcontainer = document.getElementsByClassName('audio-container audio-' + this.audio.id)[0]
    const title = document.getElementsByClassName('audio-title-' + this.audio.id)[0]

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

    showComments: function(){
      this.$store.commit('setCommentsPanelAudio', this.audio)
      this.$store.commit("toggleCommentsPanel")
    },

    like: async function(){
      const response = await ApiAudio.like(this.audio.id)
      if(response[1]){
        this.audio.likes.count += 1
    }else{
        this.audio.likes.count -= 1
    }
    }
  },
};
