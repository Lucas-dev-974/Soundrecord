<template>
    <div style="width: 100%; height: 100%">
        <v-card color="#1A1D21" @contextmenu="show" :ripple="false" id="pists-container" style="width: 100%;" @click="on_track">
            
        </v-card>

        <v-menu v-model="show_menu" :position-x="x" :position-y="y" absolute offset-y z-index="100">
            <v-list>
                <v-list-item v-for="(item, index) in items" :key="index" >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>    
    </div>

</template>

<script src='./PistManager.js' />
