<template>
    <span>
        <div v-for="playlist of categories" v-bind:key="playlist.id">
            <CategorieItem :categorie="playlist" :track="track" :appendCategorieTrack="appendCategorieTrack"
                :removeCategorieTrack="removeCategorieTrack" />
        </div>
    </span>
</template>

<script>
import CategorieItem from './CategorieItem.vue';

export default {
    props: {
        categories: { required: true },
        track: { required: true },
        appendCategorieTrack: { required: true },
        removeCategorieTrack: { required: true },
    },

    components: { CategorieItem }
}
</script>