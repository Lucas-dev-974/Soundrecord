<template>
    <form>
        <v-card elevation="13" outlined max-width="450px" min-width='340px' id="auth-card">
            <v-card-title primary-title  class="text-center d-flex justify-center bg-dark text-white">
                Connexion
            </v-card-title>
            <v-container fluid class="pa-8">
                <v-text-field  v-model="email" :rules="email_rule" label="Email"></v-text-field>
                <v-text-field  type="password" v-model="password" label="Mot de passe"></v-text-field>
                <a class="pa-0 ma-0" @click="forgot_password">mot de passe oublié ?</a>
            </v-container>

            <v-card-actions class="d-flex justify-space-around">
                <v-btn color="#282828" class="text-orange pa-5" small  style="width: 130px" @click="$emit('switchCard', 'register')">S'enregistrer</v-btn>
                <v-btn color="#282828" class="text-green pa-5"  small  style="width: 130px" @click="login">Connexion</v-btn>
            </v-card-actions>
        </v-card>

        <MailNotif />
    </form>

</template>


import MailNotif1 from '../components/MailNotif.vue.js';<script src='./js/Login.js' />
