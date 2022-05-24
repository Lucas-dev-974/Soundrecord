<template>
    <v-card dark color="1A1D21" class="no-radius audios-controller dark-1" style="border-bottom: 1.5px solid #63D189"> 
        <div class=" " style="min-width: 270px">
            <a href="/profile" class="custom-link mx-1" > Dashboard</a>
            <v-menu dark offset-y :close-on-content-click="false" min-width="120px" width="180px">
                <template v-slot:activator="{ on, attrs }">
                    <a href="#" class="custom-link mx-1" v-bind="attrs" v-on="on"> Fichier </a>
                </template>

                <v-list  class="app-menu py-0" elevation="10">
                    <v-list-item class="d-flex justify-center text-3 menu-item">Enregistrer</v-list-item>
                    <v-list-item class="d-flex justify-center text-3 menu-item" @click="download">Télécharger</v-list-item>
                </v-list>
            </v-menu>
            <Menu />
        </div>
        
        <div class="d-flex"  id="barManager-audiosController">

            <div class="d-flex align-top pa-2 mr-9" id="bar-manager-btns">
                <v-btn color="#D81616" class="border-left" @click="stop_Record" v-if="in_record">
                    <v-icon>mdi-stop-circle-outline</v-icon>
                </v-btn>

                <v-btn color="#D81616" class="border-left" icon @click="start_Record" v-else>
                    <v-icon>mdi-record-circle-outline</v-icon>
                </v-btn>
                

                <v-btn color="#D81616" class="border-center" icon>
                    <v-icon>mdi-skip-previous</v-icon>
                </v-btn>

                <v-btn color="#63D189" class="border-center"  v-if="!in_play" @click="handlePlay"  icon id="play-button">
                    <v-icon>mdi-play-circle-outline</v-icon>
                </v-btn>

                <v-btn color="dark" class="border-center" v-else @click="handle_Pause" id="pause-button" icon>
                    <v-icon color="#F24E1E" c>mdi-pause-circle-outline</v-icon>
                </v-btn>

                <v-btn color="#D81616" class="border-right" icon>
                    <v-icon>mdi-skip-next</v-icon>
                </v-btn>
            </div>   
            <div class="d-flex align-center w-50">
                <div class="timer">
                    {{player.duration != null ? player.duration : '00:00'}}
                </div>
                <VolumeController :type='"g_volume"' />      

                <v-btn small elevation="10"  icon dark color="white" :class="(player.track_on_move ? 'active' : 'nocative') + ' square-btn'" @click="track_move">
                        <v-icon>mdi-arrow-left-right</v-icon>
                </v-btn>
                          
            </div>     

        </div>
    </v-card>
</template>

<script src='./BarManager.js' />
