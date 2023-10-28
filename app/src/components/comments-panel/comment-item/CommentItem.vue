<template>
    <div class="comment-item">
        <div class="comment-informations">
            <img :src="authorPicture()" alt="">
            <p @click="goToAuthor" class="cursor-pointer">{{ comment.author.pseudo }}</p>
        </div>
        <div class="comment-content">
            <p class="comment-text">{{ comment.content }}</p>
            <div class="comment-actions" v-if="$store.state.user != null">
                <v-icon @click="reply" size="22">mdi-reply</v-icon>
                <v-icon size="20" v-if="comment.signaled" class="comment-alert  active"
                    @click="signalComment">mdi-alert-circle-outline</v-icon>
                <v-icon size="20" v-else class="comment-alert" @click="signalComment">mdi-alert-circle-outline</v-icon>
            </div>
        </div>
    </div>
</template>

<script>
import "./CommentItem.css"
import ApiComment from "../../../apis/api.comments"
export default {
    props: {
        comment: { required: true },
        setReplyTo: { reuqired: true },
        getInputRef: { required: true }
    },

    data() {
        return {
            inReply: false
        }
    },

    mounted() {
        console.log(this.comment.author);
    },

    methods: {
        signalComment: async function () {
            const response = await ApiComment.singalComment(this.comment.id)
            if (response[1]) {
                this.comment.signaled += 1
            } else {
                this.comment.signaled -= 1
            }
        },

        goToAuthor: function () {
            this.$router.push('/profile?pseudo=' + this.comment.author.pseudo)
        },

        authorPicture() {
            let host;
            if (window.location.host.includes('localhost')) host = "https://localhost:3000"
            else true // TODO
            return host + "/api/user-picture?pseudo=" + this.comment.author.pseudo
        },

        reply: function () {
            this.setReplyTo(this.comment.id)
            this.getInputRef().focus()
        }
    }

}
</script>