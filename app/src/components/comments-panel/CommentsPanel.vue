<template>
    <section v-if="!$store.state.commentsPanel.open && $store.state.commentsPanel.audio.id != null" id="comments-panel">
        <section class="comments-panel-container">
            <header class="comments-header">
                <p class="comments-header-title">{{ $store.state.commentsPanel.audio.name }}</p>
                <v-icon class="close-comment-panel" @click="toggleCommentsPanel">mdi-close</v-icon>
            </header>
            <span class="separator" />

            <div class="comments-content">
                <div class="" v-for="comment of comments" v-bind:key="comment.id">
                    <CommentItem :comment="comment" :setReplyTo="setReplyTo" :getInputRef="getInputRef" />
                </div>
            </div>

            <footer class="comments-footer">
                <CommentInput :setInputRef="setInputRef" :getReplyTo="getReplyTo" v-if="$store.state.user != null"
                    :audioid="audioid" @pushComment="pushComment" placeholder="Entrer un commentaire" />
                <p v-else class="comments-footer-text">Connectez-vous pour commenter</p>
            </footer>
        </section>
    </section>
</template>

<script>
import "./CommentsPanel.css"
import ApiComment from "../../apis/api.comments"
import CommentItem from "./comment-item/CommentItem.vue";
import CommentInput from "./comment-input/CommentInput.vue";

export default {
    components: { CommentItem, CommentInput },

    props: {
        audioid: { required: true },
    },

    watch: {
        audioid: function () {
            this.getComments()
        }
    },

    data() {
        return {
            comments: [],
            replyTo: undefined,
            inputRef: undefined,
        }
    },

    mounted() {
        if (!this.audioid == 0) {
            this.getComments()
        }
    },

    methods: {
        getComments: async function () {
            this.comments = await ApiComment.getCommentForAudio(this.audioid)
        },

        toggleCommentsPanel: function () {
            this.$store.commit("toggleCommentsPanel")
        },

        pushComment: function (comment) {
            console.log("comment");
            this.comments = { ...this.comments, comment }
        },

        getReplyTo: function () {
            return this.replyTo
        },

        setReplyTo: function (commentid) {
            this.replyTo = {
                responseOf: commentid
            }
        },

        getInputRef: function () {
            return this.inputRef
        },

        setInputRef: function (ref) {
            this.inputRef = ref
        }
    }
}
</script>