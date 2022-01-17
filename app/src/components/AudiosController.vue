<template>
    <v-card dark color="#1A1D21" class="no-radius audios-controller">
        <div class="d-flex justify-space-between audios-controller-content">

            <div class="pt-1" :style="{width: responsive.g_volumeWidth}">
                <v-slider  v-model="g_volume" step="0" max=100 prepend-icon="mdi-volume-high"></v-slider>
            </div>
            

            <div class="d-flex  ">
                <v-btn color="#D81616" icon class="button-controls">
                    <v-icon>mdi-record-circle-outline</v-icon>
                </v-btn>

                <v-btn color="#63D189" icon class="button-controls">
                    <v-icon>mdi-play-circle-outline</v-icon>
                </v-btn>

                <v-btn color="#F24E1E" icon class="button-controls">
                    <v-icon>mdi-pause-circle-outline</v-icon>
                </v-btn>
            </div>

            <div class="timer pt-2">
                1:00:00
            </div>
        </div>

    </v-card>
</template>

<script src='./js/AudiosController.js' />
