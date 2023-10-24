<template>
    <div class="fs-3 text-white d-flex justify-space-between align-center">
        <div class="head-lefft w-80 d-flex align-center pl-3">
            <!-- SEARCH BAR  -->
            <v-text-field label="Search" hide-details="auto" dense rounded solo v-model="query"
                @keypress.enter="search"></v-text-field>

            <v-btn v-if="item == 'session' && !on_add" color="success" class="ml-4" outlined icon x-small
                @click="on_add = !on_add">
                <v-icon> mdi-plus </v-icon>
            </v-btn>


            <!-- Import file -->
            <!-- <div v-if="item == 'pist'"  class="ml-4">
                <v-file-input hide-input accept=".mp3,.wav" color="red" hide-details="true" background-color="success" filled dark dense prepend-icon="mdi-plus" class="ma-0 pa-0 pb-1" v-model="file" ></v-file-input>
            </div> -->


            <!-- ------------------------------- ADD ITEM  -->
            <div v-if="item == 'session'" :class="'d-flex ml-3 add_session add' + (on_add ? 'add' : 'disable')">
                <v-text-field rounded placeholder="Nom de la session" @keydown.enter="create" @keydown.esc="on_add = false"
                    solo v-model="session_name" hide-details="auto" dense></v-text-field>
                <v-btn color="" dark icon>
                    <v-icon small color="red" @click="on_add = false">mdi-close</v-icon>
                </v-btn>
            </div>
        </div>

        <!-- PAGINATION -->
        <div class="head-right pr-10 d-flex align-center">
            <v-btn small icon color="white" @click="paginate('previous-page')">
                <v-icon color="">mdi-chevron-left</v-icon>
            </v-btn>

            {{ page }}

            <v-btn small icon color="white" @click="paginate('next-page')">
                <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
        </div>
    </div>
</template>

<script>
import api from '../services/ApiService.js'

export default {
    props: {
        add_url: { required: false },
        item: { required: true },
        search_url: { required: false },
        theme: { required: false }
    },

    data() {
        return {
            query: '',
            result: [],
            on_add: false,

            session_name: '',
            params: {},
            page: 0,
            total_page: 0,

            file: null
        }
    },

    watch: {
        file: function () {
            this.create()
        },

        query: function () {
            this.search()
        }
    },

    methods: {
        search: async function () {
            api.post(this.search_url, { query: this.query }).then(async ({ data }) => {
                if (this.item == 'session') {
                    if (data.totalItems > 0) this.$parent.sessions = data.datas
                    else await this.$parent.GetSessions();
                } else if (this.item == 'pist') {
                    if (data.totalItems > 0) this.$parent.pists = data.datas
                    else await this.$parent.get();
                }

            }).catch(error => {
                console.log(error);
            })
        },

        create: function () {
            if (this.item == 'session') {
                this.$parent.createSession(this.session_name)
            } else if (this.item == 'pist') {
                if (this.file !== null) {

                    // Create form to send file
                    let formData = new FormData()
                    formData.append('audio', this.file) // Add file

                    // Send request with the form data
                    api.post(this.add_url, formData).then(({ data }) => {
                        this.$parent.pists.push({ id: data.id, name: data.name })
                        this.session_name = ''
                        this.on_add = false
                    }).catch(error => {
                        console.log(error);
                    })
                }
            } else {
                console.log();
            }
        },

        paginate: async function (state) {
            if (state == 'next-page') {
                if (this.page < this.total_page)
                    this.page += 1
            } else if (state == 'previous-page') {
                if (this.page > 0) this.page -= 1
            }

            if (this.item == 'session') {
                this.total_page = await this.$parent.get_sessions(this.page)
            } else if (this.item == 'pist') {
                this.total_page = await this.$parent.get(this.page)
            } else if (this.item == 'creator') {
                let parent = this.$parent.$parent.$parent;
                this.total_page = await parent.get_artists(this.page)
            }
        }
    }
}
</script>