<template>
    <v-card width="fit-content" height="100%" dark class="no-radius" >
        <v-navigation-drawer color="#1A1D21" dark left :mini-variant.sync="mini" v-model="open" permanent>
            <v-list-item>
                <Bibi />
                <v-list-item-title>Pistes</v-list-item-title>

                <v-btn icon @click.stop="mini = !mini">
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
            </v-list-item>
        </v-navigation-drawer>
    </v-card>
</template>

<script src='./js/sidebar.js' />
