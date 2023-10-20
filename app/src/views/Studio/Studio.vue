<template>
    <section id="studio">
        <!-- ! Topbar -->
        <!-- ! Vertical TrackList -->
        <!-- ! Track view -->
    </section>
</template>

<script>
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
        getSession: function () { }
    }
}
</script>