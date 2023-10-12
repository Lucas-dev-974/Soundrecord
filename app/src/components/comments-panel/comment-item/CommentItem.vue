<template>
    <div class="comment-item">
        <div class="comment-informations">
            <a @click="goToAuthor">{{ comment.author.pseudo }}</a>
        </div>
        <div class="comment-content">
            <p class="comment-text">{{ comment.content }}</p>
            <div class="comment-actions">
                <div class="bubbled" v-if="$store.state.user != null">
                    <v-icon v-if="comment.signaled" class="comment-alert  active"
                        @click="signalComment">mdi-alert-circle-outline</v-icon>
                    <v-icon v-else class="comment-alert" @click="signalComment">mdi-alert-circle-outline</v-icon>

                </div>
            </div>
        </div>
    </div>
</template>

<script src="./CommentItem"></script>