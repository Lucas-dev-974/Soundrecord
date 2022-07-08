<template>
    <v-dialog v-model="dialog" width="400">
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="#282828" v-if="$store.state.width >= 1002" class="text-green mt-8 " icon elevation="9"  v-bind="attrs" v-on="on">
                <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn color="#282828" v-else small class="text-green mt-8" elevation="9" icon  v-bind="attrs" v-on="on">
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </template>

        <v-card dark >
            <v-card-title  class="bg-red">
                Créer une session
            </v-card-title>

            <div class="px-5">
                <v-text-field ref="session_name" label="Nom de la session" v-model="name" v-on:keypress.enter="createSession"></v-text-field>
            </div>

            <v-card-actions class="d-flex justify-space-around  px-5">
                <v-btn color="#282828" class="w-30 text-green" block   @click="createSession">Créer</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script src="./js/CreateSession.js" />