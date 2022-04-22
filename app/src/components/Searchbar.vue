<template>
    <div class="fs-3 text-white d-flex justify-space-between align-center">
        <div class="head-lefft w-80 d-flex align-center pl-3">
            <!-- SEARCH BAR  -->
            <v-text-field label="Search" hide-details="auto" dense rounded solo v-model="query" @keypress.enter="search"></v-text-field>

            <v-btn v-if="item == 'session' && !on_add" color="success" class="ml-4" outlined icon x-small @click="on_add = !on_add"> 
                <v-icon> mdi-plus </v-icon>
            </v-btn>


            <!-- Import file -->
            <div v-if="item == 'pist'"  class="ml-4">
                <v-file-input hide-input accept=".mp3,.wav" color="red" hide-details="true" background-color="success" filled dark dense prepend-icon="mdi-plus" class="ma-0 pa-0 pb-1" v-model="file" ></v-file-input>
            </div>


            <!-- ------------------------------- ADD ITEM  -->
            <div v-if="item == 'session'" :class="'d-flex ml-3 add_session ' + (on_add ? 'add' : 'disable')">
                <v-text-field  @keydown.enter="create" @keydown.esc="on_add = false" solo v-model="session_name" hide-details="auto" dense></v-text-field>
                <v-btn  color="" dark icon>
                    <v-icon small color="red" @click="on_add = false">mdi-close</v-icon>
                </v-btn>
            </div>
        </div>

        <!-- PAGINATION -->
        <div class="head-right pr-10 d-flex align-center">
            <v-btn small  icon color="white" @click="paginate('previous-page')">
                <v-icon color="">mdi-chevron-left</v-icon>
            </v-btn>

            {{ page }}

            <v-btn small  icon color="white" @click="paginate('next-page')">
                    <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script src='./js/Searchbar.js' />