<template>
    <div style="width: 100%; height: 100%" >
        <v-card color="#1A1D21" @contextmenu="show" :ripple="false" id="pists-container" style="width: 100%;" @click="on_track">
                   
        </v-card>
        


        <v-menu dark v-model="show_menu" :position-x="x" :position-y="y" absolute offset-y z-index="100">
            <v-list class="pa-0">
                <v-list-item link @click="move_track">
                    <v-list-item-title v-if="!track_on_move">Track déplacement</v-list-item-title>
                    <v-list-item-title v-else>Fin déplacement</v-list-item-title>
                </v-list-item>
                <v-list-item link @click="track_select">
                    <v-list-item-title>Track séléction</v-list-item-title>
                </v-list-item>
                <v-list-item @click="get_pixeltime">
                    <v-list-item-title>Get bar position pixel and time</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>    
    </div>

</template>

<script src='./PistManager.js' />
