<template>
    <v-card width="5000px" height="100%" class="no-radius">
        <div  style="width: 5000px !important" class="bg-dark slider-time">
            <v-slider v-model="value" step="0" max=100></v-slider>
        </div>

        <div class="pist-content">
            <span v-for="pist in pists" :key="pist.id">
                <Pist />
            </span>
        </div>
    </v-card>
</template>

<script src='./js/PistManager.js' />
