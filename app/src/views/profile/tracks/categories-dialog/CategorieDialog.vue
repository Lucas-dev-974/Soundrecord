<template>
    <div>
        <button class="btn btn-add-genre" @click="toggleDialog">categorie +</button>
        <div v-if="openDialog" class="dialog-layout" @click="layoutClick">
            <div id="playlist-dialog" class="dialog-content">
                <p class="dialog-title">Playlists</p>
                <div class="separator" />

                <CategorieList :appendCategorieTrack="appendCategorie" :removeCategorieTrack="removeCategorie"
                    :categories="categories.datas" :track="track" />
            </div>
        </div>
    </div>
</template>

<script>
import "./AddToPlaylistDialog.css"
import CategorieList from "./categories-list/CategorieList.vue";
import ApiCategorie from "../../../../apis/api.categories"
export default {
    props: {
        track: { required: true },
        removeCategorie: { required: true },
        appendCategorie: { required: true },
    },

    data() {
        return {
            openDialog: false,
            categories: [],
            clickOutside: true,
            refContent: undefined
        };
    },

    methods: {
        setRefContent: async function () {
            if (!this.refContent) return
            const setClickOutside = (value) => this.clickOutside = value;

            this.refContent.addEventListener('mouseover', () => setClickOutside(false));
            this.refContent.addEventListener('mouseout', () => setClickOutside(true));
            this.refContent.addEventListener('focus', () => setClickOutside(false));
            this.refContent.addEventListener('focusin', () => setClickOutside(false));
            this.refContent.addEventListener('focusout', () => setClickOutside(false));
            await this.getCategories();

            return
        },

        getCategories: async function () {
            const response = await ApiCategorie.all();
            this.categories = response;
        },

        toggleDialog: function () {
            if (this.openDialog) this.openDialog = false
            else {
                this.openDialog = true
                setTimeout(async () => {
                    this.refContent = document.getElementById('playlist-dialog')
                    await this.setRefContent()
                }, 0)
            }
        },

        layoutClick: function () {
            if (this.clickOutside) {
                this.openDialog = false;
            }
        },
    },
    components: { CategorieList }
}
</script>