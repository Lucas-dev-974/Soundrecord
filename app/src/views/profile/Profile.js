import ProfileHead from "./profile-header/ProfileHead.vue";
import "./Profile.css"
import ApiUser from "../../apis/api.user"
import SessionsList from "./session-list/SessionsList.vue";

export default {
  name: "profile",
  components: { ProfileHead, SessionsList },

  data() {
    return {
      user: {
        pseudo: "Name",
        nbFollower: "Nombre de follower",
      },
      viewname: "sessions",
      userprofile: false
    };
  },

  mounted(){
    const params = (new URL(document.location)).searchParams;
    this.pseudo = params.get("pseudo");
    
    if(this.pseudo == null && this.$store.state.user == null) window.location.href = "/"

    this.userprofile = true
    this.getUserInformations()
  },

  methods: {
    getUserInformations: async function(){
      this.user = await ApiUser.get(this.pseudo)
    },

    changeView: function(viewname){
      this.viewname = viewname
    }
  },
};
