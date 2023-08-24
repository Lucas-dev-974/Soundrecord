import ProfileHead from "./profile-section/ProfileHead.vue";
import "./Profile.css"
import ApiUser from "../../apis/api.user"

export default {
  name: "profile",
  components: { ProfileHead },

  data() {
    return {
      user: null,
      pseudo: "Name",
      nbFollower: "Nombre de follower",
    };
  },

  mounted(){
    const params = (new URL(document.location)).searchParams;
    this.pseudo = params.get("pseudo");
    
    if(this.pseudo == null && this.$store.state.user == null) window.location.href = "/"

    this.getUserInformations()
  },

  methods: {
    getUserInformations: async function(){
      this.user = await ApiUser.get(this.pseudo)
    }
  },
};
