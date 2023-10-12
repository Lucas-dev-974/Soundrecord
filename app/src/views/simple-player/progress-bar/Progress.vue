<template>
    <input :ref="inputRef" @input="onInput" type="range" min="0" max="100" value="0" step="0.01"
        class="progress-input spl-progress">
</template>

<script src="./Progress.js" />