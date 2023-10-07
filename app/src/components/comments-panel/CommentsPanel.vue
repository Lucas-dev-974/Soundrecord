<template>
    <section v-if="!$store.state.commentsPanel.open && $store.state.commentsPanel.audio.id != null" id="comments-panel">
        <section class="comments-panel-container">
            <header class="comments-header">
                <p class="comments-header-title">{{ $store.state.commentsPanel.audio.name }}</p>
                <v-icon @click="toggleCommentsPanel">mdi-close</v-icon>
            </header>

            <div class="comments-content">
                <div class="" v-for="comment of comments" v-bind:key="comment.id">
                    <CommentItem :comment="comment" />
                </div>
            </div>

            <footer class="comments-footer" v-if="$store.state.user != null && $store.state.user != 'null'">
                <CommentInput :audioid="audioid" @pushComment="pushComment" />
            </footer>
        </section>
    </section>
</template>

<script src="./CommentsPanel"></script>