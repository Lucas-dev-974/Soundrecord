<template>
    <div style="height: 100%" class="d-flex">
        <div class="w-100">
            <BarManager @play_SelectedPist='play_Pists' @pause_SelectedPist='pause_Pists' @load_PlayerPist="load_PlayerPist" />
            <div class="d-flex w-100" style="height: calc(100% - 80px)">
                <Sidebar />
                <PistContainer />
            </div>
        </div>
    </div>
</template>

<script  src='./js/Session.js' ></script>
