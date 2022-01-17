<template>
    <div class="d-flex align-center w-100 justify-center"  style="height: 100% !important">
        <section id="animated_background" z-index="10" />

        <div v-if="on_login">
            <Login @switchCard="switchCard"/>
        </div>

        <div v-if="on_register">
            <Register @switchCard="switchCard" />
        </div>
    </div>
</template>

<script src='./js/auth.js'>
</script>
