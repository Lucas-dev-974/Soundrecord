<template>
    <div style="height: 100%" class="d-flex">
        <div class="w-100">
            <v-btn color="success" x-small outlined style="position: absolute; top: 10px; right: 10px; z-index: 90" @click="save">Sauvegarder</v-btn>
            <BarManager v-if="$store.state.width > 600"/>
            <div class="d-flex w-100" style="height: calc(100vh - 80px)">
                <Sidebar v-if="track_loaded"/>
                <PistContainer />
            </div>

            <BarManager v-if="$store.state.width < 600"/>
        </div>
    </div>
</template>

<script  src='./js/Session.js' ></script>
