<template>
    <section id="simple-player-container">
        <div class="sp-content">
            <div class="play-container">
                <PlayPause />
            </div>

            <p class="timer-duration">00:00</p>
            <div class="progress-container">
                <Progress :onInput="onRangeInput"></Progress>
                <!-- <div id="spl-progress"></div> -->
            </div>

            <VolumeSlider />
        </div>
    </section>
</template>

<script src="./SimplePlayer.js"></script>