<template>
    <div style="height: 100%" class="d-flex">
        <div class="w-100">
            <v-btn color="success" x-small outlined style="position: absolute; top: 10px; right: 10px; z-index: 90" @click="save">Sauvegarder</v-btn>
            <BarManager />
            <div class="d-flex w-100" style="height: calc(100vh - 80px)">
                <Sidebar v-if="track_loaded"/>
                <PistContainer />
            </div>

            <v-sheet color="grey darken-2" class="pa-3" :style="{display: track_loaded ? 'block' : 'block'}">
                <v-skeleton-loader class="mx-auto" max-width="1200" height="500px" type="card"></v-skeleton-loader>
            </v-sheet>
        </div>
    </div>
</template>

<script  src='./js/Session.js' ></script>
