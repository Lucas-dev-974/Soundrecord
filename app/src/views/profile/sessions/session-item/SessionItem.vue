<template>
    <div class="session-item">
        <div class="session-img-container">
            <img class="session-img"
                :src="'https://images.pexels.com/photos/3693108/pexels-photo-3693108.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'"
                alt="session-image">
        </div>

        <div class="session-item-content">
            <div class="session-item-line-top">
                <p>{{ session.session_name }}</p>
                <!-- <p>Size: 60Mo</p> -->
                <p>tracks: {{ session.tracksCount }}</p>
                <p>{{ session.mixed == null ? "aucun mix" : session.mixed }}</p>
                <div class="session-item-actions">
                    <button @click="open">open</button>
                </div>
            </div>
            <div class="session-item-line-bottom">
                <p class="line-fit">public:
                    <SwitchToggler :checked="session.public" @onChange="updatePublic"></SwitchToggler>
                </p>
                <p>créer: {{ session.createdAt.substring(0, 10) }} </p>
            </div>
        </div>
    </div>
</template>

<script>
import "./SessionItem.css"
import SwitchToggler from "../switch-checkbox/SwitchToggler.vue"
import apiUser from "../../../../apis/api.user";

export default {
    components: { SwitchToggler },

    props: {
        session: { required: true },
    },

    methods: {
        // TODO to complete 
        open: function () {
            this.$store.commit('setCurrentSession', this.session)
            this.$router.push('/studio')
        },
        delete: () => {

        },

        updatePublic: async function (value) {
            const response = await apiUser.update({ public: value })
            console.log(response);
        }
    }
}

</script>