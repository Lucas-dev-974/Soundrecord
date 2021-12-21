<template>
    <v-card elevation-12 outlined color="#282828" dark>
        <v-card-title primary-title justify-center>
            Enregistrement
        </v-card-title>
        <v-container fluid>
            <v-text-field  v-model="email" label="Email"></v-text-field>
            <v-text-field  v-model="name" label="Email"></v-text-field>
            <v-text-field type="password"  v-model="password" label="Mot de passe"></v-text-field>
        </v-container>

        <v-card-actions class="d-flex justify-space-around">
            <v-btn color="#F24E1E" elevation-10  style="width: 130px" @click="$emit('switchCard', 'login')">Login</v-btn>
            <v-btn color="#4CAF50" elevation-10  style="width: 130px" @click="register">Register</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script src='./js/register.js'>
</script>
