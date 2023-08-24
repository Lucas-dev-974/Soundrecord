import "./Paging.css";

export default {
  props: {
    totalItems: Number,
    itemsPerPage: {
      type: Number,
      default: 5,
    },
    currentPage: Number,
  },

  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
  },


  methods: {
    changePage(page) {
      if (page >= 0 && page <= this.totalPages) {
        this.$emit("changePage", page);
      }
    },
  },
};