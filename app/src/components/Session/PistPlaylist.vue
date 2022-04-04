<template>
    <v-dialog v-model="dialog" max-width="500px" transition="dialog-transition" dark>
        <template v-slot:activator="{ on, attrs }">
            <v-menu offset-y :close-on-content-click="false" >
                <template v-slot:activator="{ on, attrs }">
                    <a href="#" class="custom-link" v-bind="attrs" v-on="on"> Importer</a>
                </template>
                
                <v-list dark elevation="12" class="py-0">
                    <v-list-item class="d-flex justify-center text-3 menu-item"  @click="import_Microphone"> Voix/Micro </v-list-item>
                    <v-list-item class="d-flex justify-center text-3 menu-item" @click="dialog = true">Bibliothèque</v-list-item>
                </v-list>
            </v-menu>
            <v-btn color="sucess"  v-bind="attrs" v-on="on" icon style="display: none;">
            </v-btn>
            
        </template>

        <v-card dark color="#1A1D21" >
            <v-card-title class="bg-red d-flex justify-center" >
                Bibilothèque
            </v-card-title>

            <v-content style="height: 600px">
                <div class="d-flex" style="width: 50%; margin: 0 auto 0 auto;">
                    <v-text-field v-model="search" label='recherche' ></v-text-field>
                </div>
                
                <!-- Boucle to list pist -->
                <Playlist_List />

            </v-content>

            <v-card-actions >
                
                <div class="w-100" style="overflow-x: hidden">
                    <label for="input-file" class="custom-btn-label">Choisir un fichier à importer</label>
                    <input @change="handle_LocalFile" type="file" id="input-file" class="custom-btn"/>
                </div>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script src="./PistPlaylist.js"/>