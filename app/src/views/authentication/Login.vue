<template>
    <div class="auth-layout">
        <div class="auth-card">
            <header class="auth-title">Connexion</header>
            <div class="auth-content">
                <div class="w-full">
                    <label for="">Email</label>
                    <input type="text" class="auth-input" v-model="email">
                </div>

                <div class="w-full">
                    <label for="">Mot de passe</label>
                    <input type="password" v-model="password" class="auth-input">
                </div>
                <button class="forget-password">Mot de passe oublié</button>
            </div>

            <div class="auth-actions">
                <button class="register-button" @click="goToRegister">S'enregistrer</button>
                <button class="login-button" @click="login">Se connecter</button>
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
        login: async function () {
            if (this.password == undefined && this.email == undefined) {
                return alert("Les champs sont requis !")
            }

            const response = await ApiUser.login({
                email: this.email,
                password: this.password
            })

            if (!response) return console.log("ERROR: Une erreur est survenue lors de la connexion");

            this.$store.commit('setUser', response.user)
            this.$store.commit('setToken', response.token)
            this.$router.push('profile')
        },

        goToRegister: function () {
            this.$router.push("register")
        }

    }
}
</script>