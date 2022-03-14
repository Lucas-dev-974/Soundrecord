<template>
    <v-dialog v-model="dialog" max-width="500px" transition="dialog-transition" >
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="sucess"  v-bind="attrs" v-on="on" icon>
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </template>

        <v-card dark color="#282828" >
            
        </v-card>
    </v-dialog>
</template>

<script src="./js/ImportIn.js" />