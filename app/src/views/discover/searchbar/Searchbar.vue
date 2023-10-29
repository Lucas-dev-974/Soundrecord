<template>
    <div class="search-container">
        <input class="searchbar" :placeholder=placeholder type="text" v-model="searchKeywords">
    </div>
</template>

<script>
import "./Searchbar.css";

export default {
    name: "searchbar",

    props: {
        placeholder: { required: true },
        onInput: { required: false }
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
            if (this.onInput != undefined) this.onInput(this.searchKeywords)
            else
                this.$emit("searchData", this.searchKeywords);
        },
    },
};

</script>