<template>
<v-content>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <div v-if="on_login">
                    <Login @switchCard="switchCard"/>
                </div>

                <div v-if="on_register">
                    <Register @switchCard="switchCard" />
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</v-content>
    <!-- <div class="d-flex justify-center align-center">

    </div>         -->
</template>

<script src='./js/auth.js'>
</script>
