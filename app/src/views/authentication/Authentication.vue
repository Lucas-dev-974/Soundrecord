<template>
    <div class="d-flex align-center w-100 justify-center" style="height: 100% !important">
        <div v-if="on_login">
            <Login @switchCard="switchCard" />
        </div>

        <div v-if="on_register">
            <Register @switchCard="switchCard" />
        </div>
    </div>
</template>

<script src='./Authentication.js' />
