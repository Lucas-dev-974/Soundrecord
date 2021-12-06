<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      
    </v-app-bar>

    <v-main>
        <Recorder />
    </v-main>
  </v-app>
</template>

<script>
import Recorder from './components/recorder.vue'

export default {
  name: 'App',

  components: {
    Recorder
  },

  data: () => ({
      recorder: null
  }),

  mounted(){
    this.recorder = this.$refs.recorder
  },

  methods:{
    callback (msg) {
      console.debug('Event: ', msg)
      console.log(this.recorder);
    }
  }
};
</script>


<style scoped>
@import './assets/style.css';
</style>