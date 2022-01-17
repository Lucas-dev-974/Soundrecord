<template>
    <div style="height: 100%" class="d-flex">

        <div v-if="!$store.state.is_mobile">
            <Sidebar />
        </div>
        
        <v-content height="" >
            <div class="" v-if="$store.state.is_mobile">
                text
            </div>
            <AudiosController />
            <div class="pist-container">
                <PistContainer :imported_pists="imported_pists" />

            </div>

                <!-- <v-expansion-panels id="bottom-panel">
                    <v-expansion-panel>
                        <v-expansion-panel-header>
                            Item
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels> -->
        </v-content>
    </div>
</template>

<script  src='./js/home.js' ></script>
