import "./Paging.css";

export default {
  props: {
    totalPage: {required:  true},
    itemsPerPage: {required: true},
    currentPage: {required: true},
  },

  mounted(){
    console.log("current page:", this.page);
  },

  computed: {
    totalPages() {
      return Math.ceil(this.totalPage / this.itemsPerPage);
    },
  },


  methods: {
    changePage(page) {
      console.log("current page", this.currentPage);
      if (page >= 0 && page <= this.totalPages) {
        this.$emit("changePage", page);
      }
    },
  },
};
