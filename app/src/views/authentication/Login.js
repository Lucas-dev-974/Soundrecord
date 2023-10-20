import MailNotif from "../../components/MailNotif.vue";
import ApiService from "../../services/ApiService";

export default {
  components: { MailNotif },

  data() {
    return {
      email: "",
      password: "",
      dialog: false,

      email_rule: [
        (email) =>
          !email ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
          "l'email dois être valide",
      ],
    };
  },

  methods: {
    login: async function () {
      const response = await ApiService.post("/api/auth", {
        email: this.email,
        password: this.password,
      }).catch((err) => {
        this.$store.commit("push_alert", {
          open: true,
          message: err.response.data.errors,
          type: "warning",
        });
      });

      this.$store.commit("setToken", response.data.token);
      this.$store.commit("setUser", response.data.user);
      this.$router.push("/profile");
    },

    forgot_password: async function () {
      if (
        this.email.length == 0 ||
        !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email)
      )
        return this.$store.commit("push_alert", {
          type: "warning",
          message: "Veuillez saisir un email valide",
        });

      let email_send = await ApiService.post("/api/mail/password-reset", {
        email: this.email,
      }).catch((error) => console.log(error));

      if (email_send.status == 200) {
        this.$store.commit("push_alert", {
          type: "success",
          message: "Un mail vous à été envoyé.",
        });
      }
    },
  },
};
