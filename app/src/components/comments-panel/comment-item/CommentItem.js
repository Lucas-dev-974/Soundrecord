import "./CommentItem.css"
import ApiComment from "../../../apis/api.comments"
export default {
    props: {
        comment: {required: true},
    },

    methods: {
        signalComment: async function(){
            const response = await ApiComment.singalComment(this.comment.id)
            if(response[1]){
                this.comment.signaled += 1
            }else{
                this.comment.signaled -= 1
            }
        },
        
        goToAuthor: function(){
            this.$router.push('/profile?pseudo=' + this.comment.author.pseudo)
        }
    }
    
}