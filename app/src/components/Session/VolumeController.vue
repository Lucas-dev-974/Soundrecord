<template>
    <div class="d-flex  w-100" >
        <v-slider v-model="value" step="0" max=100 prepend-icon="mdi-volume-high" hide-details="true"></v-slider>
    </div>
</template>

<script src='./VolumeController.js' />