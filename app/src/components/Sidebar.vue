<template>
    <v-card width="fit-content" height="100%" dark class="no-radius dark-1" >
        <v-navigation-drawer class="dark-1"  dark left :mini-variant.sync="mini" v-model="open" permanent>
            <v-list-item>
                <v-list-item-title>
                    Pist
                </v-list-item-title>

                <v-btn icon @click.stop="mini = !mini">
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
            </v-list-item>

            <div  class="Slist-Pmanager" >
                <SidebarPistManager v-for="pist in player.tracks" :key="pist.id" :pist="pist" />
            </div>

        </v-navigation-drawer>
    </v-card>
</template>

<script src='./js/sidebar.js' />
