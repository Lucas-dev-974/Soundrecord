<template>
    <div class="comment-input">
        <input type="text" v-model="input" v-on:keypress.enter="postComment">
    </div>
</template>

<script src="./CommentInput"></script>