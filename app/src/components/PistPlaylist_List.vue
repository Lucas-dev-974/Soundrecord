<template>
    <v-simple-table dark  >
          <template>
              <thead>
              <tr>
                <th class="table-header">Pist</th>
                <th class="text-center table-header">In session</th>
                <th class="text-center table-header">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="pist in $store.state.pist_playlist" :key="pist.id">
                <td>
                  <div class="d-flex align-center" style="overflow: hidden; width: 150px">
                    <div class="text-tanslate-x h-100 d-flex" style="width: fit-content"> {{pist.name}} </div>
                  </div>
                </td>
                <td class="text-center">{{pist.ImportedInProjects.length }}</td>
                <td class="text-center">
                  <v-btn color="success" v-if="$route.name == 'session'" @click="import_PistInSession(pist)"  icon>
                    <v-icon small>mdi-transfer-down</v-icon>
                  </v-btn>
                  <Delete :whatDelete="'pist'" :id="pist.id" :url="'/api/pists/' + pist.id" :message="'Cette piste est importée dans une ou plusieurs sessions, si vous la supprimez elle serrât supprimer de toutes les sessions'"/>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
</template>

<script src="./js/PistPlaylist_List.js" />