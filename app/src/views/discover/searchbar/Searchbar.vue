<template>
    <div class="search-container">
        <input class="searchbar" :placeholder=placeholder type="text" v-model="searchKeywords" oninput="searchKeywords">
    </div>
</template>

<script src='./Searchbar.js' />