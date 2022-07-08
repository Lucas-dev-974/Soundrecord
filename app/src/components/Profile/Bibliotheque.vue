<template>
    <div class="">
        <searchbar :add_url="'/api/pist'" :item="'pist'" :search_url="'/api/search/pists'" /> 
        <div class="container">
            <v-simple-table>
                <thead>
                    <tr>
                        <th class="text-left">Piste</th>
                        <th class="text-center"></th>
                        <th class="text-right">action</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="pist in pists" :key="pist.id" >
                        <td>{{ pist.name }}</td>
                        <td class="text-center">{{ pist.importedIn }}</td>
                        <td class="text-right">
                            <v-btn x-small icon color="red" @click="deletePist(pist.id)"> <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-simple-table>   
        </div>
    </div>

</template>

<script src="./js/Bibliotheque.js" />