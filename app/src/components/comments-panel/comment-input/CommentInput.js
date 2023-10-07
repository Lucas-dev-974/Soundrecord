import ApiComment from "../../../apis/api.comments.js"

export default {
    props: {
        audioid: {required: true},
    },

    data(){
        return {
            input: ""
        }
    },

    methods: {
        postComment: async function(){
            if(this.input != "" && !isNaN(this.audioid)){
                const response = await ApiComment.postComment(this.audioid, this.input)
                this.$emit('pushComment', response)
            } 
        }
    }
}