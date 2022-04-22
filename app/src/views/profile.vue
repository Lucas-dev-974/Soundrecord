<template>
    <div>

        <v-card tile class="px-0 mx-0 w-100 mb-5 pb-1 " min-height="250px" height="250px">
            <div style="position: absolute; z-index: 100" v-if="on_update">
                <v-btn small icon color="#63D189" @click="update_color" class="pt-2">
                    <v-icon>mdi-palette</v-icon>   
                </v-btn>
            </div>
            <v-overlay :value="overlay" class="w-100">     
                <div class="w-50 p-absolute">
                    <v-card elevation="11" class="w" width="500px" height="600px" v-click-outside="update_color">
                        test
                    </v-card>
                </div>
            </v-overlay>
            <div style="position: absolute; right: 0; top: 5px" >
                <v-btn v-if="!on_update && my_profile" color="warning" class="mx-2" small icon  @click="update_profile"> <v-icon>mdi-tune-vertical</v-icon> </v-btn>
                <v-btn v-if="on_update && my_profile" small icon color="success" @click="update_profile"> <v-icon color="">mdi-check-underline</v-icon> </v-btn>
                
                <v-btn color="red" class="mx-2"     x-small outlined @click="$store.commit('logout')" >Déconnexion</v-btn>
            </div>
            
            <div :class="'w-80 d-flex ' + ($store.state.WIDTH <= 600 ? 'pa-2' : 'container')" style="height: 80%">
                <div class="">
                    <v-img :src="user_img" :width="+ $store.state.WIDTH <= 600 ? 100 : 180" style="border-radius: 15px; transition: all 1s;">
                            <div v-if="on_update"  class="ml-4">
                                <v-file-input hide-input accept=".png,.jpg"  filled dark dense prepend-icon="mdi-progress-download" v-model="picture_file" ></v-file-input>
                            </div>
                    </v-img>
                </div>

                <div :class="'account-details pt-3 pl-5' + (show_details ?  ' show' : ' dshow')">
                    <div class="d-flex h-fit justify-space-between">
                        <input :disabled="!on_update" class="custom-profile-input" type="text" placeholder="Prénom Nom" @keypress="update_fields('name')" v-model="name">
                        <v-btn v-if="on_update" color="success" class="" @click="update_fields('name', true)" icon x-small>
                            <v-icon small>mdi-eye</v-icon>
                        </v-btn>
                    </div>
                    
                    <div class="d-flex h-fit justify-space-between">
                        <input :disabled="!on_update" class="custom-profile-input" type="text" placeholder="Pseudo" @keypress="update_fields('pseudo')" v-model="pseudo">
                        <v-btn v-if="on_update" color="success" @click="update_fields('pseudo', true)" icon x-small>
                             <v-icon small>mdi-eye</v-icon>
                        </v-btn>
                    </div>
                    
                    <div class="d-flex h-fit justify-space-between">
                        <input :disabled="!on_update" class="custom-profile-input" type="text" placeholder="Email" @keypress="update_fields('email')"   v-model="email">
                        <v-btn v-if="on_update" color="success" @click="update_fields('email', true)" x-small icon>
                             <v-icon small>mdi-eye</v-icon>
                        </v-btn>
                    </div>
                    

                    <input :disabled="!on_update" v-if="on_update" class="custom-profile-input" type="text" placeholder="Lien Facebook" @keypress="update_fields('facebook_link')" v-model="facebook_link">
                    <input :disabled="!on_update" v-if="on_update" class="custom-profile-input" type="text" placeholder="Lien Instagrame" @keypress="update_fields('instagram_link')" v-model="instagram_link">
                </div>
            </div>
            <div class="w-80 d-flex container justify-space-between user-bar-bottom align-center">
                <div id="profile-creations-count" class="d-flex align-center">  <v-icon color="blue">mdi-creation</v-icon>0</div>
                <div id="profile-user-namelastname" class="d-flex align-center">
                    <input type="text" :value="name" :disabled="true" class="text-center">
                </div>
                <div id="profile-likes-count" class="d-flex align-center">0  <v-icon color="red">mdi-cards-heart</v-icon>
                </div>
            </div>
        </v-card>        

        <div class="container w-80 profile-bottom-section">
            <div class="d-flex mb-4 ">
                <v-btn v-if="my_profile" @click="page = 'session'" color="success" class="mx-2" outlined rounded x-small>Session</v-btn>
                <v-btn v-else @click="page = 'session'" color="success" class="mx-2" outlined rounded x-small>Creation</v-btn>
                <v-btn @click="page = 'bibliotheque'" color="success" class="mx-2" outlined rounded x-small>Bibliothèque</v-btn>
                <!-- <v-btn @click="page = 'packs'" color="success" class="mx-2" outlined rounded x-small>Packs</v-btn> -->
            </div>
            <div v-if="my_profile && page == 'session' ">
                <SessionLists />
            </div>

            <div v-if="page == 'bibliotheque' ">
                <Bibliotheque :mine="my_profile ? true : false" />
            </div>
        </div>

    </div>
</template>

<script src="./js/profile.js" />