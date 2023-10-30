<template>
    <div>
        <v-icon @click="toggleDialog" class="update-profile-btn" v-if="this.$store.state.userProfile.isMyProfile" size="22"
            color="orange">mdi-account-cog-outline</v-icon>

        <div v-if="openDialog" class="dialog-layout " @click="layoutClick">
            <div id="playlist-dialog" class=" dialog-content-update-profile ">
                <p class="dialog-title">Paramètre profile</p>
                <div class="separator" />

                <div class="mt-5">
                    <LabeledInput class="my-5" :label="'Pseudo'" :setState="updatePseudo" :defaultValue="pseudo" />
                    <LabeledInput class="my-5" :label="'Email'" :setState="updateEmail"
                        :defaultValue="$store.state.user.email" />
                    <div class="line-fit my-5">
                        <p>Profile publique:</p>
                        <SwitchToggler :checked="this.$store.state.user.public" :onChange="updatePublic" />
                    </div>

                    <div class="grid">
                        <button class="button upload-picture-btn" @click="updatePicture">Importer une nouvelle
                            photo</button>
                        <button class="validate-btn" @click="validate">Valider</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SwitchToggler from "../sessions/switch-checkbox/SwitchToggler.vue";
import "./AddToPlaylistDialog.css"
import LabeledInput from "./labeled-input/LabeledInput.vue";
import ApiUser from "../../../apis/api.user"

export default {
    components: { LabeledInput, SwitchToggler },

    data() {
        return {
            openDialog: false,
            categories: [],
            clickOutside: true,
            refContent: undefined,
            pseudo: this.$store.state.user.pseudo,
            profilePicture: undefined,
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

            return
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

        updatePseudo: function (pseudo) {
            this.pseudo = pseudo
        },

        updateEmail: function (value) {
            this.$store.commit("setUser", {
                ...this.$store.state.user,
                email: value
            })
        },

        updatePicture: function () {
            const input = document.createElement('input');
            input.type = 'file';


            input.addEventListener('change', async () => {
                const files = Array.from(input.files);
                this.profilePicture = files[0]
            })

            input.click();
        },

        updatePublic: function (value) {
            this.$store.commit("setUser", {
                ...this.$store.state.user,
                public: value
            })
        },

        validate: async function () {
            const response = await ApiUser.update(this.$store.state.user.id, {
                fields: "pseudo|email|public",
                values: this.pseudo + "|" + this.$store.state.user.email + "|" + this.$store.state.user.public
            })

            this.$store.commit('setUser', response)
            console.log(response);
            if (this.profilePicture != undefined) {
                const response = await ApiUser.uploadPictureProfile(this.profilePicture)
                console.log(response);
            }

        }
    },
}
</script>