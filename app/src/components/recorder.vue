<template>
    <div>

        <div id="song-manager-bar" class=" d-flex justify-center">
            <v-btn color="red" class="mx-10" @click="record">Record</v-btn>
            <v-btn color="success" class="mx-10" @click="stop">Stop</v-btn>
            <v-btn color="success" class="mx-10" @click="play">play</v-btn>
            <v-btn color="success" class="mx-10" @click="save">save</v-btn>
              <v-file-input v-model="files"
                color="deep-purple accent-4"
                counter
                label="Importé un fichier.mp3"
                placeholder="Select your files"
                prepend-icon="mdi-paperclip"
                outlined
                :show-size="1000"
            >
    <template v-slot:selection="{ index, text }">
      <v-chip
        v-if="index < 2"
        color="deep-purple accent-4"
        dark
        label
        small
      >
        {{ text }}
      </v-chip>

      <span
        v-else-if="index === 2"
        class="text-overline grey--text text--darken-3 mx-2"
      >
        +{{ files.length - 2 }} File(s)
      </span>
    </template>
  </v-file-input>
        </div>

        <div ref="pistes">
            <div  v-for="pist in pists" :key="pist.id">
                <span :id="'audioSlider' + pist.id" class="d-flex align-center">
                    <v-checkbox v-model="selectedPist" :value="pist" ></v-checkbox>
                    <pist :currentTime="slider" :audio="pist" />
                </span>
            </div>
        </div>


    </div>
</template>

<script src='./js/recorder.js'></script>