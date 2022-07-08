<template>
    <div class="d-flex align-center  w-100" >
        <v-slider dense v-model="value" step="0" max=100 prepend-icon="mdi-volume-high" hide-details="true"></v-slider>
    </div>
</template>

<script src='./VolumeController.js' />