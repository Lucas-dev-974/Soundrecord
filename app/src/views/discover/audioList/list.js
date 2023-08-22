import "./list.css";
import AudioItem from "./AudioItem.vue";

export default {
  name: "audios-discover-collection",
  components: { AudioItem },

  props: {
    audios: { required: true },
  },
};
