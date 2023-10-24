<template>
    <div class="auth-layout">
        <div class="auth-card">
            <header class="auth-title">S'enregistrer</header>
            <div class="auth-content">
                <div class="w-full">
                    <label for="">Email</label>
                    <input type="text" class="auth-input" v-model="email">
                </div>

                <div class="w-full">
                    <label for="">Pseudo</label>
                    <input type="text" class="auth-input" v-model="pseudo">
                </div>

                <div class="w-full">
                    <label for="">Mot de passe</label>
                    <input type="password" v-model="password" class="auth-input">
                </div>
            </div>

            <div class="auth-actions">
                <button class="login-button" @click="goToLogin">Se connecter</button>
                <button class="register-button" @click="register">S'enregistrer</button>
            </div>
        </div>
    </div>
</template>

<script>
import ApiUser from "../../apis/api.user"
import "./auth.css"
export default {
    data() {
        return {
            pseudo: undefined,
            email: undefined,
            password: undefined
        }
    },

    methods: {
        register: async function () {
            if (this.password == undefined && this.email == undefined && this.pseudo == undefined) {
                return alert("Les champs sont requis !")
            }

            const response = await ApiUser.register({
                email: this.email,
                pseudo: this.pseudo,
                password: this.password
            })
            if (!response) return console.log("ERROR: Une erreur est survenue lors de la connexion");

            this.$store.commit('setUser', response.user)
            this.$store.commit('setToken', response.token)
            this.$router.push('profile')
        },

        goToLogin: function () {
            this.$router.push("login")
        }

    }
}
</script>