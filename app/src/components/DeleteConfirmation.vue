<template>
    <v-dialog  width="450px" v-model="dialog" transition="dialog-transition" >
        <template v-slot:activator="{ on, attrs }">
            <v-btn  x-small color="red"  v-bind="attrs" v-on="on" icon>
                <v-icon color="">mdi-close</v-icon>
            </v-btn>
        </template>

        <v-card dark>
            <v-card-title  class="bg-red">
                Confirmé la suppression
            </v-card-title>

            <v-card-text class="text-center pt-8">
                {{message}}
            </v-card-text>
            <v-card-actions class="d-flex justify-space-around pa-5 py-8">
                <v-btn  color="#282828" class="text-greens w-30 text-red">Annuler</v-btn>
                <v-btn color="#282828" class="w-30 text-green"  @click="DeleteFunc">Je confirme</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>


<script src="./js/DeleteConfirmation.js" />