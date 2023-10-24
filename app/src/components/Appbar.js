import "./AppBar.css";

export default {
  methods: {
    onClickLogo: function () {
      this.$router.push("/");
    },

    login: function () {
      this.$router.push("/login");
    },

    logout: function () {
      this.$store.commit("setToken", "");
      this.$store.commit("setUser", null);
      this.$router.push("/");
    },
  },
};
