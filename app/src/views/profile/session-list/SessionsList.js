import SearchBar from "../../../components/search-bar/SearchBar.vue"
// import Api from "../../../apis/"

export default {
    components: {SearchBar},

    data(){
        return {
            sessions: []
        }
    },

    methods: {
        getSessions: async function (){
            // const json = await Api
            return []
        },

        addSession: function(){
            console.log("add session");    
        }
    }
}