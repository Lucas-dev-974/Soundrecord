<template>
    <div class="comment-item">
        <div class="comment-informations">

        </div>
        <div class="comment-content">
            <p class="comment-text">{{ comment.content }}</p>
            <div class="comment-actions">
                <div class="bubbled" v-if="$store.state.user != null">
                    <v-icon @click="signalComment">mdi-alert-circle-outline</v-icon>
                    <span class="bubble">
                        {{ comment.signaled }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script src="./CommentItem"></script>