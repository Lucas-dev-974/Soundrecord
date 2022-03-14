<template>
        <v-list-item class="Slist-item">
            <div class="h-100  w-100  d-flex">
                <div class="Smanage-item h-100">
                    <v-btn :id="'select-btn-' + pist.id"  class="Smanager-select h-100" @click="DeselectSelect">S</v-btn>
                </div>

                <div class="w-100 Smanager-content">
                    <div class="d-flex justifejy-space-between">
                        <div class="pist-name">
                            <input type="text" :ref="nameInput_ref" v-model="name" class="text-white w-90">
                        </div>
                        <v-menu offset-x left :close-on-content-click="false" dark>
                            <template v-slot:activator="{on, attrs}">
                                <v-btn icon v-on="on" v-bind="attrs">
                                    <v-icon>mdi-dots-horizontal</v-icon>
                                </v-btn>
                            </template>

                            <v-card elevation="11">
                                <v-list dark class="my-0 py-0 px-0 mx-0" > 
                                    <v-list-item class="text-3 menu-item" @click="$refs[nameInput_ref].focus()">  Renomer </v-list-item>

                                    <v-list-item class="text-3 menu-"  style="display: grid !important; max-height: 55px" @click="ChangePistColor"> 
                                        <div style="width: fit-content"> Couleur de la pist  </div> <br>
                                        <div class="d-flex justify-space-between">
                                            <v-btn class="mx-1" color="rgb(169, 99, 209)" @click="ChangePistColor('rgb(169, 99, 209)')" elevation="6" fab x-small max-width="20px" max-height="20px"></v-btn>
                                            <v-btn class="mx-1" color="rgb(99, 209, 137)" @click="ChangePistColor('rgb(99, 209, 137)')" elevation="6" fab x-small max-width="20px" max-height="20px"></v-btn>
                                            <v-btn class="mx-1" color="rgb(209, 99, 99)"  @click="ChangePistColor('rgb(209, 99, 99)')" elevation="6" fab x-small max-width="20px" max-height="20px"></v-btn>
                                            <v-btn class="mx-1" color="rgb(29, 139, 236)" @click="ChangePistColor('rgb(29, 139, 236)')" elevation="6" fab x-small max-width="20px" max-height="20px"></v-btn>
                                        </div>
                                    </v-list-item>
                                    
                                    <v-list-item class="text-3 menu-item" @click="DeselectSelect" v-if="selected"> Déselectionner </v-list-item>

                                    <v-list-item class="text-3 menu-item" v-else @click="DeselectSelect"> 
                                        Sélectionner 
                                    </v-list-item>

                                    <v-list-item class="text-3 menu-item" @click="deleteImportedPist"> Supprimer </v-list-item>
                                </v-list>                                
                            </v-card>

                        </v-menu>
                    </div>

                    <v-slider v-model="volume" step="0" class="w-50" max="9" prepend-icon="mdi-volume-high">
                    </v-slider>
                </div>
            </div>
        </v-list-item>    
</template>

<script src='./js/SidebarPistManager.js' />