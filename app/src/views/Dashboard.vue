<template>
  <div  height="100">

    <!-- User card -->
    <v-card elevation="10" class="mx-auto px-lg-15 px-md-5 px-xs-2 mt-5 " height="100px" id="user-card">
      <v-list-item class="grow w-100">
        <v-list-item-avatar width="40" height="40" color="grey darken-3">
          <v-img alt="" :src="'http://127.0.0.1:3000/api/picture/?token=' + $store.state.token "></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            <input type="text"  v-model="email" class=" user-card-input" disabled>
          </v-list-item-title>

          <v-list-item-title>
            <input type="text" class="user-card-input" v-on:keyup.enter="updateUser" v-model="name"> 
          </v-list-item-title>

          <v-list-item-title>
            <a href="#" class="user-card-link">Réinitialiser mon mot de passe</a>
          </v-list-item-title>
        </v-list-item-content>

        <div class="h-100" id="dashboard-logout">
          <v-btn color="red" outlined small v-if="$store.state.WIDTH > 560" @click="logout"> Déconnexion</v-btn>
          <v-btn color="red" outlined x-small v-else @click="logout" >Déconnexion</v-btn>
        </div>
      </v-list-item>
    </v-card>

    <section  class="d-flex mx-auto" id="dash-container">
      <div id="sessions_container" class="px-3">
        <div class="d-flex justify-space-between">
          <div class="my-7 dark title-custom">Mes sessions</div>
          <CreateSession/>
        </div>

        <v-simple-table dark  color="red" elevation="11" fixed-header height="fit-content" style="max-height: 400px !important; overflow-y: auto;">
          <template>
            <thead>
              <tr>
                <th class="table-header">Session</th>
                <th class="text-center table-header">Pistes importer</th>
                <th class="text-center table-header">Action</th>
              </tr>
            </thead>

            <tbody >
              <tr v-for="session in $store.state.sessions" :key="session.id">
                <td class="text-" >{{session.session_name}}</td>
                <td class="text-center">0</td>
                <td class="text-center">
                  <v-btn x-small color="#282828" class="text-green " @click="openSession(session.id)">ouvrir</v-btn>
                  <Delete :whatDelete="'session'"  :url="'/api/sessions/' + session.id" :id="session.id"/>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>

      </div>
      <div class="registered_audios px-10" id="registered_audios">
        <div class="text-right my-7 dark" style="font-size: 24px">Bibliotheque</div>
        <Playlist_List />
      </div>
    </section>
  </div>
</template>

<script src="./js/Dashboard.js" />
