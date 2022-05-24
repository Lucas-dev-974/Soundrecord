<template>
    <div class="">
        <v-overlay :value="overlay" z-index="15" color="black">
          <v-card v-click-outside="close" width="400" height="auto">
            <v-card-title primary-title>
              {{ title }}
            </v-card-title>
            <v-card-text v-if="type == 'reset_password'" class="px-8 py-0 my-0">
              Entrer un nouveaux mot de passe:
              <div class="my-2">
                <v-text-field class="py-0 my-0" dense light v-model="password" solo label="Mot de passe" @keyup.enter="reset_password" placeholder="Mot de passe"></v-text-field>
                <v-text-field class="py-0 my-0" dense light v-model="password_confirmation" solo label="Confirmer le mot de passe" @keyup.enter="reset_password" placeholder="Confirmer le mot de passe"></v-text-field>
              </div>
            </v-card-text>

            <v-card-actions class="px-8">
              <v-btn class="py-0 my-0" color="success" small outlined block @click="reset_password">Suivant</v-btn>
            </v-card-actions>
          </v-card>
        </v-overlay>
    </div>
</template>

<script src="./js/MailNotice.js" />