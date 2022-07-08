<template>
    <v-card dark color="ca0000" class="no-radius audios-controller dark" > 
        <div class="mb-1" style="min-width: 270px">
            <a href="/profile" :class="'mx-1 custom-link-' + $store.state.theme " > Dashboard</a>
            <v-menu dark offset-y :close-on-content-click="false" min-width="120px" width="180px">
                <template v-slot:activator="{ on, attrs }">
                    <a href="#" :class="' mx-1 custom-link-' + $store.state.theme" v-bind="attrs" v-on="on"> Fichier </a>
                </template>

                <v-list  class="app-menu py-0" elevation="10">
                    <v-list-item class="d-flex justify-center text-3 menu-item">Enregistrer</v-list-item>
                    <v-list-item class="d-flex justify-center text-3 menu-item" @click="download">Télécharger</v-list-item>
                </v-list>
            </v-menu>
            <Menu />
        </div>
        

        <div class="d-flex align-center pl-4 pt-1">
            <!-- BUTTONS GROUP AUDIO CONTROLE -->
            <div class="d-flex align-top -2 pl-10 mr-9">
                <v-btn-toggle dense background-color="#2c2c2c" borderless>
                    <v-btn   @click="record" v-if="in_record">
                        <v-icon>mdi-stop-circle-outline</v-icon>
                    </v-btn>

                    <v-btn   icon @click="stopRecord" v-else>
                        <v-icon>mdi-record-circle-outline</v-icon>
                    </v-btn>
                    
                    <v-btn    icon>
                        <v-icon>mdi-skip-previous</v-icon>
                    </v-btn>

                    <v-btn     v-if="!in_play" @click="play"  icon id="play-button">
                        <v-icon>mdi-play-circle-outline</v-icon>
                    </v-btn>

                    <v-btn   v-else @click="pause" id="pause-button" icon>
                        <v-icon>mdi-pause-circle-outline</v-icon>
                    </v-btn>

                    <v-btn   class="" icon>
                        <v-icon>mdi-skip-next</v-icon>
                    </v-btn>
                </v-btn-toggle>

                <!-- VOLUME GENERAL -->
                <div class="volume-general mx-4" style="min-width: 350px;">
                    <VolumeController :type='"g_volume"' /> 
                </div>
                <div class="timer align-center d-flex pr-5"> {{player.duration != null ? player.duration : '00:00'}} </div>


                <!-- TRACK CONTROL BUTTONS GROUP-->
                <v-btn-toggle dense background-color="#2c2c2c" borderless>
                    <v-tooltip bottom>
                        <template  v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" v-on="on" elevation="10"  icon dark color="white" :class="(player.track_on_move ? 'active' : 'nocative') + ' square-btn'" @click="track_move">
                                <v-icon>mdi-arrow-left-right</v-icon>
                            </v-btn>
                        </template>
                        <span>Déplacer les pistes</span>
                    </v-tooltip>

                    <v-tooltip bottom>
                        <template  v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs" v-on="on" elevation="10"  icon dark color="white" :class="(player.track_on_move ? 'active' : 'nocative') + ' square-btn'" @click="cutSelection">
                                <v-icon>mdi-scissors-cutting</v-icon>
                            </v-btn>
                        </template>
                        <span>Coupé la sélection</span>
                    </v-tooltip>
                </v-btn-toggle>    
            </div>    
        </div>
    </v-card>
</template>

<script src='./BarManager.js' />
