import "./Searchbar.css";

export default {
  name: "searchbar",

  props: {
    placeholder: { required: true },
  },

  data() {
    return {
      searchKeywords: "",
    };
  },

  mounted() {},

  methods: {
    onSearchInput: (e) => {
      console.log(e.target.value);
    },
  },
};
