<template>
    <div class="profile-head-container">
        <div id="profile-head-img-container" profilePictureRef={profilePictureRef}>
            <img src="https://images.pexels.com/photos/3693108/pexels-photo-3693108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="">
        </div>

        <div class="profile-head-lines">
            <div class="line justify-between">
                <div class="line-left">
                    <h2>{{ user.pseudo }}</h2>
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
                    <span>followers: {{ user.followers.followingMe.count }} </span>
                    <span>suivis: {{ user.followers.IFollow.count }} </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import "./ProfileHead.css";

export default {
    props: {
        user: { required: true },
        isLogedInProfile: { required: true }
    },

    data() {
        return {
            name: "Name",
        };
    },

    mounted() {
        console.log(this.isLogedInProfile());
    },
};
</script>