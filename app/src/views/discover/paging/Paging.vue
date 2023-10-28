<template>
    <div class="pagination">
        {{ currentPage == 0 ? '...' : currentPage - 1 }}
        <button class="paging-btn paging-previous" @click="changePage(currentPage - 1)" :disabled="currentPage === 0">
            <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 1L1 5L6 9" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
        {{ currentPage }}
        <button class="paging-btn paging-next" @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">
            <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 9L6 5L1 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
        {{ totalPage }}
    </div>
</template>

<script>
import "./Paging.css";
export default {
    props: {
        totalPage: { required: true },
        itemsPerPage: { required: true },
        currentPage: { required: true },
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

</script>