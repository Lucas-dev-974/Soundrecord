<template>
    <div class="d-flex h-100 ma-0 pa-0">
        <div :class="'py-0 ' + ($store.state.WIDTH < 600 ? 'w-100' : 'w-40')" style="flex-wrap: wrap" v-if="$store.state.WIDTH > 600 || ($store.state.WIDTH < 600 && page == 'artists')">
            <artists class="bg-red" />
        </div>
        <div :class="$store.state.WIDTH < 600 ? 'w-100' : 'w-60'" v-if="$store.state.WIDTH > 600 || ($store.state.WIDTH < 600 && page == 'songs')">
        </div>

        <div class="d-flex justify-space-around" id="discover-mobile-bottom-navigation" v-if="$store.state.WIDTH < 600">
            <v-btn @click="page = 'artists'" color="success" class="mx-2" outlined rounded x-small>Artists</v-btn>
            <v-btn @click="page = 'songs'" color="success" class="mx-2" outlined rounded x-small>Songs</v-btn>
        </div>
    </div>
</template>

<script src='./js/discorver.js' />