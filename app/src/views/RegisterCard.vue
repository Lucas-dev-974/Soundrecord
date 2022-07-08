<template>
    <v-card elevation="13" outlined max-width="450px" min-width='340px' id="auth-card" ref="form">
        <v-card-title primary-title  class="text-center d-flex justify-center bg-dark text-white">
            Enregistrement
        </v-card-title>
        <v-container fluid class="pa-8">
            <v-text-field ref="email"  name="email"  required :rules="email_rule"  v-model="email" label="Email"></v-text-field>
            <v-text-field ref="name"   name="name"   required :rules="[() => !!name || 'Ce champs est requis']" v-model="name" label="Nom prénom"></v-text-field>
            <v-text-field ref="pseudo" name="pseudo" required :rules="[() => !!pseudo || 'Ce champs est requis']" v-model="pseudo" label="Pseudo"></v-text-field>
            <v-text-field ref="phone"  name="phone"  v-model="phone" label="Téléphone"></v-text-field>
            <v-text-field ref="password" name="password" required :rules="[() => !!password || 'Ce champs est requis']" type="password"  v-model="password" label="Mot de passe"></v-text-field>
        </v-container>

        <v-card-actions class="d-flex justify-space-around">
            <v-btn color="#282828" class="text-green pa-5"  small  style="width: 130px" @click="$emit('switchCard', 'login')">Connexion</v-btn>
            <v-btn color="#282828" class="text-orange pa-5" small  style="width: 130px" @click="checkForm">S'enregistrer</v-btn>
        </v-card-actions>
    </v-card>
</template> 

<script src='./js/Register.js'>
</script>
