<template>
    <div>
        <div class="w-100">
            <p class="title">Dashboard</p>
        </div>

        <section class="user-section">
            <Searchbar :on-input="searchUser" :placeholder="'Pseudo, email d\'un utilisateur'" />

            <div v-for="user of users" v-bind:key="user.id" class="user-list">
                <UserItem :user="user" />
            </div>
        </section>
    </div>
</template>

<script>
import "./Admin.css"
import ApiAdmin from "../../apis/api.admin"
import Searchbar from "../discover/searchbar/Searchbar.vue"
import UserItem from "./user-item/UserItem.vue"

export default {
    components: { Searchbar, UserItem },

    data() {
        return {
            users: [],
            comments: [],
        }
    },

    mounted() {
        if (this.$store.state.user.role != 1) {
            this.$store.commit('push_alert', {
                message: "Vous ne pouvez pas accéder à cet page.",
                type: "error",
            })
            this.$router.push('/')
        }

        this.laodUsers()
    },

    methods: {
        laodUsers: async function () {
            const response = await ApiAdmin.all()
            this.users = response
            console.log(response);
        },

        searchUser: async function (querySearch) {
            const response = await ApiAdmin.seach(querySearch)
            console.log(response);
        },
    }
}

</script>