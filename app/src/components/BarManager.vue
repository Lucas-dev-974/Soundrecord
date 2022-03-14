<template>
    <v-card dark color="1A1D21" class="no-radius audios-controller dark-1" style="border-bottom: 2.5px solid #63D189"> 
        <div class="pl-5 " style="min-width: 270px">
            <a href="/dashboard" class="custom-link mx-1" > Dashboard</a>
            <v-menu dark offset-y :close-on-content-click="false" min-width="120px" width="180px">
                <template v-slot:activator="{ on, attrs }">
                    <a href="#" class="custom-link mx-1" v-bind="attrs" v-on="on"> Fichier </a>
                </template>

                <v-list  class="app-menu py-0" elevation="10">
                    <v-list-item class="d-flex justify-center text-3 menu-item">Enregistrer</v-list-item>
                    <v-list-item class="d-flex justify-center text-3 menu-item">Télécharger</v-list-item>
                </v-list>
            </v-menu>
            <PistPlaylist />
        </div>
        
        <div class="d-flex" id="barManager-audiosController">
            <div class="d-flex align-top     mr-9">
                
                <v-btn color="#D81616" icon @click="stop_Record" v-if="in_record">
                    <v-icon>mdi-stop-circle-outline</v-icon>
                </v-btn>

                <v-btn color="#D81616" icon @click="start_Record" v-else>
                    <v-icon>mdi-record-circle-outline</v-icon>
                </v-btn>
                

                <v-btn color="#D81616" icon>
                    <v-icon>mdi-skip-previous</v-icon>
                </v-btn>

                <v-btn color="#63D189"  v-if="!in_play" @click="handlePlay"  icon id="play-button">
                    <v-icon>mdi-play-circle-outline</v-icon>
                </v-btn>

                <v-btn color="dark" v-else @click="handle_Pause" id="pause-button" icon>
                    <v-icon color="#F24E1E" c>mdi-pause-circle-outline</v-icon>
                </v-btn>

                <v-btn color="#D81616" icon>
                    <v-icon>mdi-skip-next</v-icon>
                </v-btn>
                
                <div class="timer">
                     {{$store.state.player_currentTime}}
                </div>
            </div>        
            <div class="align-center " :style="{width: responsive.g_volumeWidth}">
                <v-slider  v-model="g_volume" step="0" max=100 prepend-icon="mdi-volume-high"></v-slider>
            </div>
        </div>
    </v-card>
</template>

<script src='./js/BarManager.js' />
