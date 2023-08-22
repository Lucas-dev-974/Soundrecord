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

  mounted() {
    this.$watch("$data.searchKeywords", this.search);
  },

  methods: {
    search: async function () {
      this.$emit("searchData", this.searchKeywords);
    },
  },
};
