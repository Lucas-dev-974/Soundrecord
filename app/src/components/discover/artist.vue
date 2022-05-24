<template>
    <div :class="'discover-songs-artist h-100 '">

        <div class="search-navigation w-100 py-5">
            <!-- Search -->
            <div class="d-flex justify-space-between" id="discover-artist-search">
                <h3 class="w-30 text-center text-white" style="align-self: center;">ARTIST</h3>
                
                <Searchbar class="w-70" :item="'creator'" :theme="'ligth'" />
            </div>
            
            <!-- Category -->
            <div class="d-flex justify-center" id="discover-artist-categorie">

            </div>
        </div>
        <!-- Artist's list-->
        <v-list dark dense rounded class="artist-container-list h-auto mt-6"  style="border-radius: 0 !important;">

            <!-- Artist's list-->
            <v-list-item-group v-model="art_selected" color="white" >
                <v-list-item  v-for="artist in artists" :key="artist.id" class="artist-item">
                    <v-list-item-content >
                        <div class="d-flex justify-space-between align-center">
                            <div class="w-20 d-flex align-center text-white">
                                <div class="mr-4" style="width: 40px;">
                                    <v-img width="200px" style="border-radius: 25px;" contain :src="api.defaults.baseURL + '/api/picture?userid=' + artist.id"></v-img>
                                </div>
                                {{artist.pseudo != null ? artist.pseudo : artist.name}} 
                            </div>

                            <div class="top-audio-cotainer">
                                
                            </div>

                            <div class=" text-white">
                                <a @click="$router.push('/profile?userid=' + artist.id)" class="mr-2">voir</a>
                                {{artist.likes}}
                                <v-icon color="red">mdi-cards-heart</v-icon>
                            </div>
                        </div>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </div>
</template>

<script src="./js/artist.js" />