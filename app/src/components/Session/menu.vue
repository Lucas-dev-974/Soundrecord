<template>
    <v-dialog v-model="dialog" max-width="500px" transition="dialog-transition" dark>
        <template v-slot:activator="{ on, attrs }">
            <v-menu offset-y :close-on-content-click="false" >
                <template v-slot:activator="{ on, attrs }">
                    <a href="#" :class="'custom-link-' + $store.state.theme" v-bind="attrs" v-on="on"> Importer</a>
                </template>
                
                <v-list dark elevation="12" class="py-0">
                    <v-list-item class="d-flex justify-center text-3 menu-item"  @click="importMicrophone"> Voix/Micro </v-list-item>
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

            <div style="height: 600px">
                <div class="d-flex" style="width: 50%; margin: 0 auto 0 auto;">
                    <v-text-field v-model="search" label='recherche' ></v-text-field>
                </div>
                
                <!-- Boucle to list pist -->
                <!-- <Playlist_List /> -->

                <v-simple-table dark  height="530px">
                    <template>
                        <thead>
                        <tr>
                            <th class="table-header">Pist</th>
                            <th class="text-center table-header">Action</th>
                        </tr>
                        </thead>

                        <tbody  v-if="$store.state.biblio.length > 0">
                            <tr v-for="pist in $store.state.biblio" :key="pist.id">
                                <td>
                                <div class="d-flex align-center" style="overflow: hidden; width: 150px">
                                    <div class="text-tanslate-x h-100 d-flex" style="width: fit-content"> {{pist.name}} </div>
                                </div>
                                </td>
                                <td class="text-center">
                                <v-btn color="success" v-if="$route.name == 'session'" @click="importPistInSession(pist)"  icon>
                                    <v-icon small>mdi-transfer-down</v-icon>
                                </v-btn>
                                <!-- <Delete :whatDelete="'pist'" :id="pist.id" :url="'/api/pist/' + pist.id" :message="'Cette piste est importée dans une ou plusieurs sessions, si vous la supprimez elle serrât supprimer de toutes les sessions'"/> -->
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>   

            </div>

            <v-card-actions >
                
                <div class="w-100" style="overflow-x: hidden">
                    <label for="input-file" class="custom-btn-label">Choisir un fichier à importer</label>
                    <input @change="handleFileToUpload" type="file" id="input-file" class="custom-btn"/>
                </div>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script src="./menu.js"/>