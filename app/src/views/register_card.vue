<template>
    <v-card elevation="13" outlined max-width="450px" min-width='340px' id="auth-card">
        <v-card-title primary-title  class="text-center d-flex justify-center bg-dark text-white">
            Enregistrement
        </v-card-title>
        <v-container fluid class="pa-8">
            <v-text-field  v-model="email" label="Email"></v-text-field>
            <v-text-field  v-model="name" label="Email"></v-text-field>
            <v-text-field type="password"  v-model="password" label="Mot de passe"></v-text-field>
        </v-container>

        <v-card-actions class="d-flex justify-space-around">
            <v-btn color="#282828" class="text-green pa-5"  small  style="width: 130px" @click="$emit('switchCard', 'login')">Connexion</v-btn>
            <v-btn color="#282828" class="text-orange pa-5" small  style="width: 130px" @click="register">S'enregistrer</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script src='./js/register.js'>
</script>
