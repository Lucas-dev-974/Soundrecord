<template>
    <v-dialog v-model="dialog" max-width="500px" transition="dialog-transition" >
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="sucess"  v-bind="attrs" v-on="on" icon>
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </template>

        <v-card dark color="#282828" >
            <v-card-title class="bg-red d-flex justify-center" >
                Bibilothèque
            </v-card-title>

            <v-content style="height: 600px">
                <div class="d-flex" style="width: 50%; margin: 0 auto 0 auto;">
                    <v-text-field v-model="search" label='recherche' ></v-text-field>
                </div>

                <div>
                    
                </div>
            </v-content>

            <v-card-actions >
                <v-btn color="success" block>Importer</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script src="./js/bibi.js"/>