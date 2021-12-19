<template>
    <v-card dark color="#1A1D21" class="no-radius audios-controller">
        <div class="d-flex audios-controller-content">
            <VolumeController style="width: 200px" />

            <div class="d-flex">
                <v-btn color="#D81616" icon>
                    <v-icon>mdi-record-circle-outline</v-icon>
                </v-btn>

                <v-btn color="#63D189" icon>
                    <v-icon>mdi-play-circle-outline</v-icon>
                </v-btn>

                <v-btn color="#F24E1E" icon>
                    <v-icon>mdi-pause-circle-outline</v-icon>
                </v-btn>
            </div>

            <div class="timer">
                1:00:00
            </div>
        </div>

    </v-card>
</template>

<script src='./js/AudiosController.js' />
