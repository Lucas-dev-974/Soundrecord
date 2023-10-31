<template>
    <div class="user-item">
        <img class="user-picture" :src="'http://localhost:3000/api/user-picture?pseudo=' + user.pseudo"
            alt="user-profile-picture">

        <div class="w-100">
            <div class="flex justify-between">
                <p>{{ user.pseudo }}</p>

                <div class="flex gap-2">
                    <p>Compte active:</p>
                    <SwitchToggler class="b--1" :checked="user.enable" :on-change="enableAccount" />
                </div>
            </div>

            <div class="flex">
                <p>{{ user.email }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import apiAdmin from "../../../apis/api.admin";
import SwitchToggler from "../../profile/sessions/switch-checkbox/SwitchToggler.vue";
import "./UserItem.css"

export default {
    components: { SwitchToggler },
    props: {
        user: { required: true }
    },

    data() {
        return {}
    },

    methods: {
        enableAccount: async function (value) {
            console.log("enable account:", value);
            const response = await apiAdmin.update(this.user.id, {
                field: "enable",
                value: value
            })
            console.log(response);
        }
    }
}
</script>