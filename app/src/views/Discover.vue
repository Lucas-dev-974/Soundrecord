<template>
    <div class="d-flex h-100 ma-0 pa-0" id="discover-container">
        <div :class="'py-0 artist-part ' + ($store.state.width < 600 ? 'w-100' : 'w-40')" style="flex-wrap: wrap" v-if="$store.state.width > 600 || ($store.state.width < 600 && page == 'artists')">
            <artists class="" />
        </div>
        <div :class="$store.state.width < 600 ? 'w-100' : 'w-60'" v-if="$store.state.width > 600 || ($store.state.width < 600 && page == 'songs')">
            <songs />
        </div>

        <div class="d-flex justify-space-around" id="discover-mobile-bottom-navigation" v-if="$store.state.width < 600">
            <v-btn @click="page = 'artists'" color="success" class="mx-2" outlined rounded x-small>Artists</v-btn>
            <v-btn @click="page = 'songs'" color="success" class="mx-2" outlined rounded x-small>Songs</v-btn>
        </div>
    </div>
</template>

<script src='./js/discorver.js' />