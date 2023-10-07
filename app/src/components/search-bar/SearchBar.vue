<template>
    <div class="input-form">
        <input class="input" type="text" v-model="entry" v-on:keypress.enter="handleEnter" :placeholder="placeholder">
    </div>
</template>

<script src="./SearchBar.js" />