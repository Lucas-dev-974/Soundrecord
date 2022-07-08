<template>
    <div>
        <Searchbar :add_url="'/api/session'" :item="'session'" :search_url="'/api/search/sessions'" />

        <div class="container">
            <v-simple-table>
                <thead>
                    <tr>
                        <th class="text-left">Session</th>
                        <th class="text-center">pistes importé</th>
                        <th class="text-center">public</th>
                        <th class="text-right">action</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="session in sessions" :key="session.id" >
                        <td>{{ session.session_name }}</td>
                        <td class="text-center">{{ session.importedIn }}</td>

                        <td class="d-flex justify-center align-center">
                            <v-switch dense color="primary" v-model="session.public" @change="update('public', session.public, session.id)"></v-switch>
                        </td>

                        <td class="text-right">
                            <v-btn color="success" v-if="session.mixed" x-small icon>
                                <v-icon>mdi-download</v-icon>
                            </v-btn>

                            <v-btn icon color="success" x-small @click="openSession(session.id)">
                                <v-icon>mdi-open-in-new</v-icon>
                            </v-btn>

                            <v-btn x-small icon color="red" @click="deleteSession(session.id)"> 
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-simple-table>
        </div>     
    </div>
</template>

<script src="./js/SessionLists.js" />