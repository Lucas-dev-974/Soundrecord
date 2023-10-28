<template>
    <div class="comment-input">
        <input ref="commentInput" type="text" v-model="input" v-on:keypress.enter="postComment" :placeholder="placeholder">
    </div>
</template>

<script>
import ApiComment from "../../../apis/api.comments.js"
import "./CommentInput.css"

export default {
    props: {
        audioid: { required: true },
        getReplyTo: { required: true },
        setInputRef: { required: true },
        placeholder: { required: false },
    },

    data() {
        return {
            input: ""
        }
    },

    mounted() {
        this.setInputRef(this.$refs.commentInput)
    },

    methods: {
        postComment: async function () {
            if (this.input != "" && !isNaN(this.audioid)) {
                let response;
                if (this.getReplyTo()) {
                    response = await ApiComment.replyTo(this.audioid, this.getReplyTo().responseOf, this.input)
                } else response = await ApiComment.postComment(this.audioid, this.input)
                this.$emit('pushComment', response)
            }
        }
    }
}
</script>