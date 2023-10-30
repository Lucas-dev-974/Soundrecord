<template>
    <div class="profile-head-container">
        <div id="profile-head-img-container" profilePictureRef={profilePictureRef}>
            <img :src="'http://localhost:3000/api/user-picture?pseudo=' + user.pseudo" alt="">
        </div>

        <div class="profile-head-lines">
            <div class="line justify-between">
                <div class="line-left line-fit w-100 justify-between">
                    <h2>{{ user.pseudo }}</h2>
                    <UpdateProfileDialog />
                </div>
                <div class="line-right">
                    <button v-if="!isLogedInProfile()">Suivre</button>
                </div>
            </div>

            <div class="line justify-between">
                <div class="line-left">
                    <div class="line">

                    </div>
                    <div class="line">
                        <p>Production Total: {{ user.totalProductions }}</p>

                    </div>
                </div>

                <div class="line-right">
                    <span>suiveur: {{ user.followers.followingMe.count }} </span>
                    <span>suivis: {{ user.followers.IFollow.count }} </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UpdateProfileDialog from "../../update-profile-dialog/UpdateProfileDialog.vue";
import "./ProfileHead.css";

export default {
    components: { UpdateProfileDialog },

    props: {
        user: { required: true },
        isLogedInProfile: { required: true },
    },

    data() {
        return {
            name: "Name",
        };
    },

    methods: {
        openDialogUpdateProfile: function () {

        }
    }


};
</script>