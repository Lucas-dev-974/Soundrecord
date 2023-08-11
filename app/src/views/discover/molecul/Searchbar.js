export default{
    name: 'searchbar',

    data() {
        return {
            searchKeywords: ''
        }
    },

    mounted() {
    },

    methods: {
        onSearchInput: (e) => {
            console.log(e.target.value);
        }
    },
}