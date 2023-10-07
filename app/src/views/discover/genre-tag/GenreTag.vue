<template>
    <p v-if="onClick" class="button genre-tag" @onClick="onClick">{{ text }}</p>
    <p v-else class="genre-tag" @onClick="onClick">{{ text }}</p>
</template>

<script src="./GenreTag.js"/>