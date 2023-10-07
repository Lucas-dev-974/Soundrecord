import "./CommentsPanel.css"
import ApiComment from "../../apis/api.comments"
import CommentItem from "./comment-item/CommentItem.vue";
import CommentInput from "./comment-input/CommentInput.vue";

export default {
    components: { CommentItem, CommentInput },

    props: {
        audioid: {required: true},
    },

    watch: {
        audioid: function(){
            this.getComments()
        }
    },

    data(){
        return {
            comments: []
        }
    },

    mounted(){
        if(!this.audioid == 0){
            this.getComments()
        }
    },

    methods: {
        getComments: async function(){
            this.comments = await ApiComment.getCommentForAudio(this.audioid)
        },

        toggleCommentsPanel: function(){
            this.$store.commit("toggleCommentsPanel")
        },

        pushComment: function(comment){
            this.comments = {...this.comments, comment}
        }
    }
}