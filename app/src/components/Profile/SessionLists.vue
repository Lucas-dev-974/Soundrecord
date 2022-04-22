<template>
    <div>
        <Searchbar :add_url="'/api/session'" :item="'session'" :search_url="'/api/search/sessions'" />

        <div class="container">
            <v-simple-table>
                <thead>
                    <tr>
                        <th class="text-left">Session</th>
                        <th class="text-center">pistes importé</th>
                        <th class="text-center">mixage</th>
                        <th class="text-right">action</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="session in sessions" :key="session.id" >
                        <td>{{ session.session_name }}</td>
                        <td class="text-center">{{ session.importedIn }}</td>
                        <td class="text-center">
                            <a href="http://#">mix/DL</a>
                        </td>
                        <td class="text-right">
                            <v-btn color="success" outlined x-small @click="open_session(session.id)">ouvrir</v-btn>
                            <v-btn x-small icon color="red" @click="delete_session(session.id)"> <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-simple-table>
        </div>     
    </div>
</template>

<script src="./js/SessionLists.js" />