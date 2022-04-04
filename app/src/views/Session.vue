<template>
    <div style="height: 100%" class="d-flex">
        <div class="w-100">
            <BarManager />
            <div class="d-flex w-100" style="height: calc(100% - 80px)">
                <Sidebar v-if="track_loaded"/>
                <PistContainer />
            </div>
        </div>
    </div>
</template>

<script  src='./js/Session.js' ></script>
