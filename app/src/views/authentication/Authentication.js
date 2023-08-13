import Login from "./LoginCard.vue";
import Register from "./RegisterCard.vue";
import "./Authentication.css";

export default {
  components: {
    Login,
    Register,
  },

  data() {
    return {
      on_login: true,
      on_register: false,
    };
  },

  methods: {
    switchCard: function (card) {
      if (card == "login") {
        this.on_register = false;
        this.on_login = true;
      } else {
        this.on_login = false;
        this.on_register = true;
      }
    },
  },
};
