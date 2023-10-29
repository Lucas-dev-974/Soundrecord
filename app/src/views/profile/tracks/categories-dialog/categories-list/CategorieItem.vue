<template>
    <div class="line justify-between">
        <label :for="'playlist-' + categorie.id">{{ categorie.name }}</label>
        <input ref="inputRef" type="checkbox" v-model="inTrack" @click="onClick">
    </div>
</template>

<script>
import ApiAudio from "../../../../../apis/api.audio"

export default {
    props: {
        categorie: { required: true },
        track: { required: true },
        appendCategorieTrack: { required: true },
        removeCategorieTrack: { required: true },
    },

    data() {
        return {
            inTrack: false,
            refInput: undefined,
            bufferTrack: undefined,
        }
    },

    async mounted() {
        this.inTrack = await this.isInTrack()
    },

    methods: {
        isInTrack: async function () {
            const track = await this.track.categories.find(item => item.id == this.categorie.id)
            return track != undefined
        },

        onClick: async function () {
            const response = await ApiAudio.appendCategorie(this.track.id, this.categorie.name)
            if (response[1]) this.appendCategorieTrack(response[0])
            else this.removeCategorieTrack(response[0])
        }
    }
}
</script>