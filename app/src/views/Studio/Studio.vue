<template>
    <section class="studio">
        <p class="title">
            Page en cour de construction
        </p>
        <button @click="goToProfile" class="return-btn">retour au profile</button>
        <!-- ! Topbar -->
        <!-- ! Vertical TrackList -->
        <!-- ! Track view -->
    </section>
</template>

<script>
import "./Studio.css"
export default {
    data() {
        return {
            sessionName: "Session name",
            tracks: []
        }
    },

    mounted() {
        console.log(this.$store.state.currentSession);
    },

    methods: {
        getSession: function () { },
        goToProfile: function () {
            this.$router.push("/profile")
        }
    }
}
</script>