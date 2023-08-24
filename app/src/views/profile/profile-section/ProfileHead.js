import "./ProfileHead.css";

export default {
  props: {
    user: {required: true}
  },

  data() {
    return {
      name: "Name",
      nbFollower: "nbFollower",
      profilePictureRef: null
    };
  },

  mounted(){
    this.profilePictureRef = document.getElementById("profile-head-img-container")
    console.log(this.profilePictureRef);
    // this.profilePictureRef.style.backgroundImage = "url(https://images.pexels.com/photos/3693108/pexels-photo-3693108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)"
  }
};
