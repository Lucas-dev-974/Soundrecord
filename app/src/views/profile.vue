<template>
    <div>
        <v-card tile :color="banner_color" class="px-0 mx-0 w-100 mb-5 pb-1 " min-height="250px" height="250px">
            <div class="banner-img" v-if="banner_img">
                <div class="banner-img-filter"></div>
                <v-img :src="banner_img"></v-img>
            </div>

            <!-- OVERLAY -->
            <!-- <v-overlay :value="overlay" class="w-100" color="#000" style="z-index: 15;">
                <div class="w-50 p-absolute">
                    <v-card elevation="11" class="container" width="500px" height="600px" v-click-outside="update_banner">
                        <div class="fs-2 text-center my-4">Couleur de fond</div>
                        <v-color-picker dot-size="13" v-model="banner_color" hide-mode-switch mode="hexa"
                            swatches-max-height="189" class="mx-auto"></v-color-picker>

                        <label class="profile-banner-import-img" for="banner-img-input">
                            <div class="choose-banner-img-filter"></div>
                            <v-img v-if="banner_img != null" :src="banner_img" style="border-radius: 15px"></v-img>

                            <div class="ml-4 d-flex" style="position: absolute; z-index: 11;">
                                <v-file-input hide-input accept=".png,.jpg" id="banner-img-input" filled dark dense
                                    prepend-icon="mdi-progress-download" v-model="picture_file"></v-file-input>
                                <v-btn icon color="red" class="mt-1" @click="remove_banner_img">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                            </div>
                        </label>

                        <v-btn class="mt-2" small elevation="" block color="success" plain
                            @click="update_banner('save_banner')">Sauvegarder</v-btn>
                    </v-card>
                </div>
            </v-overlay> -->


            <div class="banner-right-top">
                <v-btn small icon color="#63D189" @click="update_banner('open_banner_setting')" v-if="on_update"
                    class="pt-2 mx-1">
                    <v-icon>mdi-palette</v-icon>
                </v-btn>

                <v-btn v-if="!on_update && my_profile" color="warning" class="mx-1" small icon @click="update_profile">
                    <v-icon>mdi-tune-vertical</v-icon> </v-btn>

                <v-btn v-if="on_update && my_profile" small icon color="white" class="mx-1" @click="update_profile"> <v-icon
                        color="">mdi-check-underline</v-icon> </v-btn>

                <v-btn color="red" class="text-white px-4 mr-2 py-2 mx-1" x-small
                    @click="$store.commit('logout')">Déconnexion</v-btn>

                <div v-if="on_update" class="text-white d-flex justify-end pa-4 pr-0">
                    <div class="d-flex justify-end" style="width: fit-content">
                        public:
                        <v-switch hide-details="true" class="ma-0 pa-0 mt-1 ml-2" x-small dense color="white"
                            v-model="public_profile"></v-switch>
                    </div>

                </div>
            </div>


            <div :class="'w-80 d-flex user-infos-container ' + ($store.state.width <= 600 ? 'pa-2' : 'container')"
                style="height: 80%">
                <div class="profile-image-container">
                    <v-img :src="user_img" :width="+ $store.state.width <= 600 ? 100 : 180"
                        style="border-radius: 15px; transition: all 1s;">
                        <div v-if="on_update" class="p-img-icon-upload">
                            <v-file-input hide-input accept=".png,.jpg" filled dark dense
                                prepend-icon="mdi-progress-download" v-model="picture_file"
                                meta-picture-profile="user_picture"></v-file-input>
                        </div>
                    </v-img>
                </div>

                <div :class="'account-details pt-3 pl-5' + (show_details ? ' show' : ' dshow')">
                    <div class="d-flex h-fit justify-space-between">
                        <v-btn v-if="on_update" color="success" class="" @click="update_fields('name', true)" icon x-small>
                            <v-icon small>mdi-eye</v-icon>
                        </v-btn>
                        <input :disabled="!on_update" class="custom-profile-input" type="text" placeholder="Prénom Nom"
                            @keypress="update_fields('name')" v-model="name">

                    </div>

                    <div class="d-flex h-fit justify-space-between">
                        <v-btn v-if="on_update" color="success" @click="update_fields('pseudo', true)" icon x-small>
                            <v-icon small>mdi-eye</v-icon>
                        </v-btn>
                        <input :disabled="!on_update" class="custom-profile-input" type="text" placeholder="Pseudo"
                            @keypress="update_fields('pseudo')" v-model="pseudo">
                    </div>

                    <div class="d-flex h-fit justify-space-between">
                        <v-btn v-if="on_update" color="success" @click="update_fields('email', true)" x-small icon>
                            <v-icon small>mdi-eye</v-icon>
                        </v-btn>
                        <input :disabled="!on_update" class="custom-profile-input" type="text" placeholder="Email"
                            @keypress="update_fields('email')" v-model="email">
                    </div>

                    <div :class="on_update ? 'pl-5' : ''">
                        <input :disabled="!on_update" v-if="on_update" class="custom-profile-input" type="text"
                            placeholder="Lien Facebook" @keypress="update_fields('facebook_link')" v-model="facebook_link">
                        <input :disabled="!on_update" v-if="on_update" class="custom-profile-input" type="text"
                            placeholder="Lien Instagrame" @keypress="update_fields('instagram_link')"
                            v-model="instagram_link">
                    </div>

                </div>
            </div>
            <div class="w-80 d-flex container justify-space-between user-bar-bottom align-center banner-footer">
                <div id="profile-creations-count" class="d-flex align-center"><v-icon color="white">mdi-creation</v-icon>0
                </div>
                <div id="profile-user-namelastname" class="d-flex align-center">
                    <input type="text" :value="name" :disabled="true" class="text-center">
                </div>
                <div id="profile-likes-count" class="d-flex align-center">{{ likes }} <v-icon
                        :color="liked == 1 ? 'red' : 'white'" @click="like_profile">mdi-cards-heart</v-icon>
                </div>
            </div>
        </v-card>

        <div class="container w-80 profile-bottom-section ">

            <!-- Page's navigation button's -->
            <div :class="'d-flex mb-4 profile-label-pages ' + ($store.state.width < 625 ? 'mobile' : 'lgscreen')">
                <v-btn v-if="my_profile" @click="page = 'session'" color="success"
                    :class="'mx-2 vbtn-' + $store.state.theme" rounded x-small>Session</v-btn>
                <v-btn v-else @click="page = 'session'" color="success" class="mx-2" rounded x-small>Creation</v-btn>
                <v-btn @click="page = 'bibliotheque'" color="success" class="mx-2" rounded x-small>Bibliothèque</v-btn>
                <!-- <v-btn @click="page = 'packs'" color="success" class="mx-2" outlined rounded x-small>Packs</v-btn> -->
            </div>

            <div v-if="my_profile && page == 'session'">
                <SessionLists />
            </div>

            <div v-if="page == 'bibliotheque'">
                <Bibliotheque :mine="my_profile ? true : false" />
            </div>
        </div>
        <MailNotif />
    </div>
</template>

<script src="./js/profile.js" />