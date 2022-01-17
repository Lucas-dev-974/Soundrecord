<template>
    <v-card width="5000px" height="100%" class="no-radius">
        <div  style="width: 5000px !important" class="bg-dark slider-time">
            <v-slider v-model="volume"  max=100></v-slider>
        </div>

        <div class="pist-content">
            <span v-for="pist in pists" :key="pist.id">
                <Pist />
            </span>
        </div>

        <div v-if="!$store.state.is_mobile">
            <v-expansion-panels id="bottom-panel" >
                <v-expansion-panel dark>
                    <v-expansion-panel-header color="dark">
                        Session name
                        <template v-slot:actions>
                            <v-icon color="#63D189">
                                mdi-chevron-up
                            </v-icon>
                        </template>
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-textarea elevation="10"></v-textarea>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </div>

    </v-card>
</template>

<script src='./js/PistManager.js' />
